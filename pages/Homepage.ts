import { expect, Page } from "@playwright/test";
import CommonActions from "../utils/CommonActions";

export default class Homepage {
  page: Page;
  actions: CommonActions;

  constructor(page: Page) {
    this.page = page;
    this.actions = new CommonActions(page);
  }

  async navigate() {
    await this.actions.navigate(
      "https://capstone-project-ten-kappa.vercel.app/",
    );
  }

  async browsePublications() {
    await this.actions.click(
      '[data-slot="button"]:text("Browse Publications")',
    );
  }

  async getBadge() {
    return await this.actions.getText("span[data-slot='badge']");
  }

  async getRoleBadge(role: string) {
    const rl = await this.getBadge();
    expect(rl).toBe(role);
  }
}
