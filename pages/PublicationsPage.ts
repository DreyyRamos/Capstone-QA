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
    await this.page.getByRole("link", { name: "The Secret Syllabus:" }).click();
  }

  async likePubsNoUser() {
    await this.likeBtn.click();
    await this.noAccountMessage();
  }
}
