import { expect, Locator, Page } from "@playwright/test";
import BasePage from "./BasePage";

export default class Homepage extends BasePage {
  readonly browsePublicationsBtn: Locator;
  readonly searchBar: Locator;
  readonly searchResult: Locator;

  constructor(page: Page) {
    super(page);

    this.browsePublicationsBtn = page.getByRole("link", {
      name: "Publications",
    });
    this.searchBar = page.getByRole("textbox", {
      name: "Search publications, forums,",
    });
    this.searchResult = page.getByTestId("search-bar-div-3");
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

  async trySearchBar() {
    await this.searchBar.click();
    await this.searchBar.fill("the secret");
    await expect(this.searchResult).toBeVisible();
  }
}
