import { Page, expect, Locator } from "@playwright/test";
import BasePage from "./BasePage";

export default class UsersPage extends BasePage {
  readonly adminToolBtn: Locator;
  readonly usersMenuBtn: Locator;
  readonly threeDotMenu: Locator;
  readonly menuItem: Locator;
  readonly comboBoxMenu: Locator;
  readonly reasonforChange: Locator;

  constructor(page: Page) {
    super(page);
    this.adminToolBtn = page.getByRole("button", { name: "Admin Tools" });
    this.usersMenuBtn = page.getByRole("menuitem", { name: "Users" });
    this.threeDotMenu = page.getByTestId("users-list-button-1");
    this.menuItem = page.getByRole("menuitem", { name: "Edit Permissions" });
    this.comboBoxMenu = page.getByRole("combobox");
    this.reasonforChange = page.getByRole("textbox", {
      name: "Reason for change (optional)",
    });
  }

  comboBoxOption(role: string): Locator {
    return this.page.getByText(role, { exact: true });
  }

  userRow(userIdentifier: string): Locator {
    return this.page.getByTestId("users-list-button-1").first();
  }

  async goto() {
    await this.navigate("/users");
  }

  async changeUserRole(role: string) {
    await this.adminToolBtn.click();
    await this.usersMenuBtn.click();
    await this.threeDotMenu.first().click();
    await this.menuItem.click();
    await this.comboBoxMenu.click();
    await this.comboBoxOption(role).click();
    await this.reasonforChange.fill("because of the changes haha");
  }
}
