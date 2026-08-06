import { expect, Locator, Page } from "@playwright/test";
import BasePage from "./BasePage";

export enum CategoryOption {
  GeneralDiscussion = "General Discussion",
  Academic = "Academic",
  ClubsAndActivities = "Clubs & Activities",
  Sports = "Sports",
  ArtsAndCulture = "Arts & Culture",
  Technology = "Technology",
  StudyGroup = "Study Group",
  Events = "Events",
  HelpAndSupport = "Help & Support",
}

export default class ForumPage extends BasePage {
  readonly createForumBtn: Locator;
  readonly titleTxtbox: Locator;
  readonly content: Locator;
  readonly category: Locator;
  readonly tagsTxtBox: Locator;
  readonly addTagsBtn: Locator;
  readonly submitForumBtn: Locator;
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
    this.createForumBtn = page.getByTestId("page-a-1");
    this.titleTxtbox = page.getByRole("textbox", { name: "Topic Title *" });
    this.content = page.locator(".tiptap");
    this.category = page.getByRole("combobox");
    this.tagsTxtBox = page.getByRole("textbox", { name: "Add tag..." });
    this.addTagsBtn = page.getByTestId("page-button-1");
    this.submitForumBtn = page.getByTestId("page-button-3");

    this.commentTxtbox = page.getByRole("textbox", {
      name: "Share your thoughts or advice",
    });
    this.postCommentBtn = page.getByRole("button", { name: "Post Reply" });

    this.replyToCommentBtn = page.locator("#comment-list-button-4");
    this.replyTxtBox = page.getByRole("textbox", {
      name: "Write your reply...",
    });
    this.submitReplyBtn = page.getByRole("button", { name: "Submit Reply" });

    this.replyToReplyToCommentBtn = page.locator("#comment-list-button-11");
    this.replyToReplyTxtBox = page.getByPlaceholder("Write your reply...");
    this.submitReplyToReplyBtn = page.getByRole("button", {
      name: "Submit Reply",
    });
  }

  async goto() {
    await this.navigate("/forum");
  }

  async gotoCreateForum() {
    await this.navigate("/forum/create");
  }

  async gotoSpecificForum(forumId: string) {
    await this.navigate(`/forum/topic/${forumId}`);
  }

  getCategoryOption(opt: CategoryOption): Locator {
    return this.page.getByRole("option", { name: opt });
  }

  async createForum(
    opt: CategoryOption,
    title: string,
    content: string,
    tags: string,
  ) {
    await this.gotoCreateForum();
    await this.titleTxtbox.fill(title);
    await this.content.fill(content);
    await this.category.click();
    await this.getCategoryOption(opt).click();
    await this.tagsTxtBox.fill(tags);
    await this.addTagsBtn.click();
    await this.submitForumBtn.click();

    await this.page.waitForURL(/\/forum\/topic\/[a-z0-9]+/);

    const url = this.page.url();
    const forumId = url.split("/").pop()!;

    return forumId;
  }

  async assertForumCreatedMessage() {
    await expect(this.page.locator("[data-sonner-toast]")).toContainText(
      "Forum created!",
    );
  }

  async clickCreateButton() {
    await this.createForumBtn.click();
  }

  async assertNoAccountMessage() {
    await this.noAccountMessage();
    await this.noAccountModalClose();
  }

  async gotoEditForum(forumId: string) {
    await this.navigate(`/profile/forums/${forumId}/update`);
  }

  async fillForumToEdit(title: string, content: string) {
    await this.page.getByRole("textbox", { name: "Topic Title *" }).fill(title);
    await this.page.getByRole("textbox", { name: "Description" }).fill(content);
  }

  async submitEditedForum() {
    await this.page.getByTestId("page-button-3").click();
  }

  async assertUpdatedForum() {
    await expect(
      this.page.getByText("Forum updated successfully!"),
    ).toBeVisible();
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
