import { expect } from "@playwright/test";
import CommonActions from "../utils/CommonActions";

export default class Homepage {
  page: any;
  actions: any;

  constructor(page: any) {
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
}
