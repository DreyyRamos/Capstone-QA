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
  readonly commentTxtbox: Locator;
  readonly reportBtn: Locator;
  readonly likeCommentBtn: Locator;
  readonly reportCommentBtn: Locator;

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
    this.commentTxtbox = page.getByRole("textbox", {
      name: "Share your thoughts about",
    });
    this.reportBtn = page.getByTestId("page-button-2");
    this.likeCommentBtn = page
      .getByTestId("publication-comment-like-button-button-1")
      .first();
    this.reportCommentBtn = page
      .getByTestId("publication-comments-button-5")
      .first();
  }

  async gotoCreate() {
    await this.navigate("/publications/create");
  }

  async fillPubsInfo() {
    await this.titleField.fill("Test Playwright 2");
    await this.excerptField.fill("Test excerpt playwright 2");
    await this.contentEditor.fill("Test body playwright 2");
  }

  async submit() {
    await this.publishBtn.click();
  }

  async confirmSubmit() {
    await this.submitPublicationBtn.click();
  }

  async assertMessage(msg: string) {
    await expect(this.page.locator("[data-sonner-toast]")).toContainText(msg);
  }

  async gotoPubs() {
    await this.navigate("/publications");
    await this.page.getByRole("link").first().click();
  }

  async likePubsNoUser() {
    await this.likeBtn.click();
    await this.noAccountMessage();
    await this.noAccountModalClose();
  }

  async commentPubsNoUser() {
    await this.commentTxtbox.fill("Test comment");
    await this.page.getByTestId("page-button-3").click();
    await this.noAccountMessage();
    await this.noAccountModalClose();
  }

  async reportPubsNoUser() {
    await this.reportBtn.click();
    await this.noAccountMessage();
    await this.noAccountModalClose();
  }

  async likeCommentNoUser() {
    await this.likeCommentBtn.click();
    await this.noAccountMessage();
  }

  async reportCommentNoUser() {
    await this.reportCommentBtn.click();
    await this.noAccountMessage();
  }
}
