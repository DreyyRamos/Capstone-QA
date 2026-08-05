import { Page, expect, Locator } from "@playwright/test";
import BasePage from "./BasePage";

export default class PublicationsPage extends BasePage {
  readonly createPubBtn: Locator;
  readonly titleField: Locator;
  readonly excerptField: Locator;
  readonly contentEditor: Locator;
  readonly publishBtn: Locator;
  readonly submitPublicationBtn: Locator;
  readonly likeBtn: Locator;
  readonly reportBtn: Locator;
  readonly likeCommentBtn: Locator;
  readonly reportCommentBtn: Locator;
  readonly updateBtn: Locator;
  readonly commentTxtbox: Locator;
  readonly postCommentBtn: Locator;
  readonly replyToCommentBtn: Locator;
  readonly replyTxtBox: Locator;
  readonly submitReplyBtn: Locator;
  readonly replyToReplyToCommentBtn: Locator;
  readonly replyToReplyTxtBox: Locator;
  readonly submitReplyToReplyBtn: Locator;

  constructor(page: Page) {
    super(page);
    this.createPubBtn = page.getByRole("button", {
      name: "Create Publication",
    });
    this.titleField = page.getByLabel("title");
    this.excerptField = page.getByLabel("excerpt");
    this.contentEditor = page.locator(".tiptap");
    this.publishBtn = page.getByRole("button", { name: "Publish" });
    this.submitPublicationBtn = page.getByRole("button", {
      name: "Submit Publication",
    });
    this.likeBtn = page.getByTestId("publication-like-button-button-1");
    this.reportBtn = page.getByTestId("page-button-2");
    this.likeCommentBtn = page
      .getByTestId("publication-comment-like-button-button-1")
      .first();
    this.reportCommentBtn = page
      .getByTestId("publication-comments-button-5")
      .first();
    this.updateBtn = page.getByRole("button", { name: "Update" });
    this.commentTxtbox = page.getByRole("textbox", {
      name: "Share your thoughts about",
    });
    this.postCommentBtn = page.getByRole("button", { name: "Post Comment" });
    this.replyToCommentBtn = page.getByRole("button", { name: "Reply" });
    this.replyTxtBox = page.getByRole("textbox", {
      name: "Write your reply...",
    });
    this.submitReplyBtn = page.getByRole("button", { name: "Reply" });
    this.replyToReplyToCommentBtn = page.locator(
      "#publication-comments-button-11",
    );
    this.replyToReplyTxtBox = page.getByPlaceholder("Write your reply...");
    this.submitReplyToReplyBtn = page.getByTestId(
      "publication-comments-button-14",
    );
  }

  async gotoCreate() {
    await this.navigate("/publications/create");
  }

  async fillPubsInfo() {
    await this.titleField.fill("Test Playwright 4");
    await this.excerptField.fill("Test excerpt playwright 4");
    await this.contentEditor.fill("Test body playwright 4");
  }

  async submit() {
    await this.publishBtn.click();
  }

  async confirmSubmit(): Promise<string> {
    await this.submitPublicationBtn.click();

    await this.page.waitForURL(/\/publications\/(?!create\b)[a-z0-9]{20,}/);

    const url = this.page.url();
    const match = url.match(/\/publications\/([a-z0-9]+)/);
    const pubId = match?.[1];

    if (!pubId) {
      throw new Error(`Could not extract publication ID from URL: ${url}`);
    }

    return pubId;
  }

  async gotoSpecificPub(pubId: string) {
    await this.navigate(`/publications/${pubId}`);
  }

  async assertMessage(msg: string) {
    await expect(this.page.locator("[data-sonner-toast]")).toContainText(msg);
  }

  async gotoPubs() {
    await this.navigate("/publications");
    await this.page.getByRole("link", { name: "The Secret Syllabus:" }).click();
  }

  async likePubsNoUser() {
    await this.likeBtn.click();
  }

  async commentPubsNoUser() {
    await this.commentTxtbox.fill("Test comment");
    await this.page.getByTestId("page-button-3").click();
  }

  async reportPubsNoUser() {
    await this.reportBtn.click();
  }

  async likeCommentNoUser() {
    await this.likeCommentBtn.click();
  }

  async reportCommentNoUser() {
    await this.reportCommentBtn.click();
  }

  async assertNoAccountMessage() {
    await this.noAccountMessage();
    await this.noAccountModalClose();
  }

  async gotoEditPubs(pubId: string) {
    await this.navigate(`/publications/${pubId}/update`);
  }

  async fillPubsEditInfo(title: string, excerpt: string, content: string) {
    await this.page.getByRole("textbox", { name: "Title *" }).fill(title);
    await this.page.getByRole("textbox", { name: "Excerpt" }).fill(excerpt);
    await this.contentEditor.fill(content);
  }

  async updatePubBtn() {
    await this.updateBtn.click();
  }

  async assertUpdatedPubsMsg() {
    await expect(this.page.getByText("Updated successfully!")).toBeVisible();
  }

  async postComment() {
    await this.commentTxtbox.fill("This is a parent comment");
    await this.postCommentBtn.click();
  }

  async assertParentComment() {
    await expect(
      this.page.getByText("Comment added successfully!"),
    ).toBeVisible();
  }

  async postReply() {
    await this.replyToCommentBtn.click();
    await this.replyTxtBox.fill("This is a reply to comment");
    await this.submitReplyBtn.click();
  }

  async assertReply() {
    await expect(
      this.page.getByText("Comment added successfully!"),
    ).toBeVisible();
  }

  async postReplyToReply() {
    await this.replyToReplyToCommentBtn.click();
    await this.replyToReplyTxtBox.fill("This is a 3rd level reply");
    await this.submitReplyToReplyBtn.click();
  }

  async assertReplyToReply() {
    await expect(
      this.page.getByText("Comment added successfully!"),
    ).toBeVisible();
  }
}
