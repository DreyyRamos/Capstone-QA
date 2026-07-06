import { expect, Page, Locator } from "@playwright/test";
import BasePage from "./BasePage";

export default class AdmissionsPage extends BasePage {
  readonly reviewBtn: Locator;
  readonly rejectBtn: Locator;
  readonly confirmReject: Locator;
  readonly approveBtn: Locator;
  readonly confirmApprove: Locator;
  readonly closeModal: Locator;

  constructor(page: Page) {
    super(page);
    this.reviewBtn = page.getByTestId("application-list-button-1").first();
    this.rejectBtn = page.getByTestId("application-list-button-4").first();
    this.confirmReject = page.getByTestId("confirmation-modal-button-2");
    this.approveBtn = page.getByTestId("application-list-button-5").first();
    this.confirmApprove = page.getByTestId("confirmation-modal-button-2");
    this.closeModal = page.getByRole("button", { name: "Close" });
  }

  async goto() {
    await this.navigate("/admissions");
  }

  async viewAdmission() {
    await this.reviewBtn.click();
  }

  async approveAdmission() {
    await this.approveBtn.click();
  }

  async confirmApproval() {
    await this.confirmApprove.click();
  }

  async rejectAdmission() {
    await this.rejectBtn.click();
  }

  async confirmRejection() {
    await this.confirmReject.click();
  }
}
