import { Page, expect } from "@playwright/test";

export default class BasePage {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigate(url: string) {
    await this.page.goto(url);
  }

  async noAccountMessage() {
    await expect(
      this.page.getByRole("heading", { name: "Sign in required" }),
    ).toBeVisible();
  }

  async noAccountModalClose() {
    await this.page.getByRole("button", { name: "Close" }).click();
  }
}
