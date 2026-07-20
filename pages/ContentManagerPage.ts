import { Page, expect, Locator } from "@playwright/test";
import BasePage from "./BasePage";

export default class ContentManagerPage extends BasePage {
  readonly optionMenuBtn: Locator;
  readonly archiveBtn: Locator;
  readonly rejectBtn: Locator;
  readonly approveBtn: Locator;

  constructor(page: Page) {
    super(page);

    this.optionMenuBtn = page.getByTestId("drafts-button-1").first();
    this.archiveBtn = page.getByRole("menuitem", { name: "Archive Post" });
    this.rejectBtn = page.getByRole("menuitem", { name: "Reject Post" });
    this.approveBtn = page.getByRole("menuitem", { name: "Approve & Publish" });
  }

  async gotoContentManagerPage() {
    await this.navigate("/content-manager");
  }

  async archivePublication(status: string) {
    await this.optionMenuBtn.click();
    await this.archiveBtn.click();
    await expect(this.page.locator("[data-sonner-toast]")).toContainText(
      `Publication ${status}!`,
    );
  }

  async rejectPublication(status: string) {
    await this.optionMenuBtn.click();
    await this.rejectBtn.click();
    await expect(this.page.locator("[data-sonner-toast]")).toContainText(
      `Publication ${status}}!`,
    );
  }

  async approvePublication() {
    await this.optionMenuBtn.click();
    await this.approveBtn.click();
  }
}
