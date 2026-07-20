import { Page, expect, Locator } from "@playwright/test";
import BasePage from "./BasePage";

export default class ModerationPage extends BasePage {
  readonly openReportMenu: Locator;
  readonly reportedDeleteBtn: Locator;
  readonly confirmDeletionBtn: Locator;

  constructor(page: Page) {
    super(page);
    this.openReportMenu = page.getByTestId("reports-list-button-1");
    this.reportedDeleteBtn = page.getByRole("menuitem", {
      name: "Delete this content",
    });
    this.confirmDeletionBtn = page.getByTestId("confirmation-modal-button-2");
  }

  async gotoModeratioPage() {
    await this.navigate("/moderation");
  }

  async deleteReportedContent() {
    await this.openReportMenu.first().click();
    await this.reportedDeleteBtn.click();
    await this.confirmDeletionBtn.click();
  }
}
