import { expect, Locator, Page } from "@playwright/test";
import BasePage from "./BasePage";

export default class Homepage extends BasePage {
  readonly browsePublicationsBtn: Locator;

  constructor(page: Page) {
    super(page);

    this.browsePublicationsBtn = page.getByRole("button", {
      name: "Browse Publications",
    });
  }

  async goto() {
    await this.navigate("/");
  }

  async browsePubs() {
    await this.browsePublicationsBtn.click();
  }
}
