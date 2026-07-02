import { test, expect, Page } from "@playwright/test";
import CommonActions from "../utils/CommonActions";

export default class PublicationsPage {
  page: Page;
  action: CommonActions;

  constructor(page: Page) {
    this.page = page;
    this.action = new CommonActions(page);
  }

  async navigate() {
    await this.action.navigate("/publications/create");
  }

  async clickTitle(title: string) {
    const link = await this.action.getLink(title);
    return await link.click();
  }

  async createPubButton() {
    await this.action.getLink("Create Publication");
  }

  async fillPubsInfo() {
    await this.action.fillTextField("title", "My test pub from playwright");
    await this.action.fillTextField("excerpt", "My test pub from playwright");
    await this.action
      .locator(".tiptap.ProseMirror")
      .fill("My test pub from playwright");
  }

  async submit() {
    await this.action.clickButton("Publish");
  }

  async confirmSubmit() {
    await this.action.clickButton("Submit Publication");
  }
}
