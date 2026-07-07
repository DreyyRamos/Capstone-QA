import { expect, Locator, Page } from "@playwright/test";
import BasePage from "./BasePage";

export default class ForumPage extends BasePage {
  readonly createForumBtn: Locator;
  constructor(page: Page) {
    super(page);
    this.createForumBtn = page.getByTestId("page-a-1");
  }

  async goto() {
    await this.navigate("/forum");
  }

  async createForum() {
    await this.createForumBtn.click();
  }
}
