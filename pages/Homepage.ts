import { expect, Locator, Page } from "@playwright/test";
import BasePage from "./BasePage";

export default class Homepage extends BasePage {
  readonly browsePublicationsBtn: Locator;

  constructor(page: Page) {
    super(page);

    this.browsePublicationsBtn = page.getByRole("link", {
      name: "Publications",
    });
  }

  async goto() {
    await this.navigate("/");
  }

  async createPubsNoAccount() {
    await this.page.getByTestId("page-a-1").click();
  }

  async browsePubs() {
    await this.browsePublicationsBtn.click();
  }
}
