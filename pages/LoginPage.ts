import { expect, Page, Locator } from "@playwright/test";
import BasePage from "./BasePage";

export default class LoginPage extends BasePage {
  readonly emailField: Locator;
  readonly passwordField: Locator;
  readonly signInBtn: Locator;

  constructor(page: Page) {
    super(page);
    this.emailField = page.getByRole("textbox", { name: "Email" });
    this.passwordField = page.getByRole("textbox", { name: "Password" });
    this.signInBtn = page.getByRole("button", { name: "Sign In" });
  }

  async gotoLoginPage() {
    await this.navigate("/login");
  }

  async login(email: string, password: string) {
    await this.emailField.fill(email);
    await this.passwordField.fill(password);
    await this.signInBtn.click();
  }

  async assertLoginSuccess() {
    await expect(this.page.getByTestId("header-button-4")).toBeVisible();
  }

  async assertErrorMessage() {
    await expect(this.page.getByText("Invalid credentials")).toBeVisible();
  }
}
