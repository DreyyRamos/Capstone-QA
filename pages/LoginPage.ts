import { expect, Page } from "@playwright/test";
import CommonActions from "../utils/CommonActions";

export default class LoginPage {
  page: Page;
  actions: CommonActions;
  constructor(page: Page) {
    this.page = page;
    this.actions = new CommonActions(page);
  }

  async navigate() {
    await this.actions.navigate(
      "https://capstone-project-ten-kappa.vercel.app/login",
    );
  }

  async login(email: string, password: string) {
    await this.actions.fill("#email", email);
    await this.actions.fill("#password", password);
    await this.actions.click('button[type="submit"]');
  }

  async getErrorMessage() {
    return await this.actions.getText("text=Invalid Credentials");
  }

  async assertErrorMessage(errorMessage: string) {
    const message = await this.getErrorMessage();
    expect(message).toContain(errorMessage);
  }
}
