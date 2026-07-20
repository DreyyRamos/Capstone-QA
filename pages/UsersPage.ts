import { Page, expect, Locator } from "@playwright/test";
import BasePage from "./BasePage";

export default class UsersPage extends BasePage {
  readonly adminToolBtn: Locator;
  readonly usersMenuBtn: Locator;
  readonly threeDotMenu: Locator;
  readonly menuItem: Locator;
  readonly comboBoxMenu: Locator;
  readonly reasonforChange: Locator;
  readonly updateRoleBtn: Locator;

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
    this.updateRoleBtn = page.getByTestId("page-button-2");
  }

  comboBoxOption(role: string): Locator {
    return this.page.getByRole("option", { name: role });
  }

  async gotoUsersPage() {
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
    await this.updateRoleBtn.click();
  }

  async assertUserRoleChangedMsg(role: string) {
    await expect(this.page.locator("[data-sonner-toast]")).toContainText(
      `User role updated to ${role} successfully!`,
    );
  }
}
