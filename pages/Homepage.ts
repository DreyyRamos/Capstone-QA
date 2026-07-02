import { expect, Page } from "@playwright/test";
import CommonActions from "../utils/CommonActions";

export default class Homepage {
  page: Page;
  action: CommonActions;

  constructor(page: Page) {
    this.page = page;
    this.action = new CommonActions(page);
  }

  async navigate() {
    await this.action.navigate("/");
  }

  async browsePublications() {
    await this.action.clickButton("Browse Publications");
  }

  // async getBadge() {
  //   return await this.action.getText("span[data-slot='badge']");
  // }

  // async getRoleBadge(role: string) {
  //   const rl = await this.getBadge();
  //   expect(rl).toBe(role);
  // }
}
