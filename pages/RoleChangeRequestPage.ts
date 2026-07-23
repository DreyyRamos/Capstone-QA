import { Page, Locator, expect } from "@playwright/test";
import BasePage from "./BasePage";

export default class RoleChangeRequestPage extends BasePage {
  readonly openApproveModalBtn: Locator;
  readonly confirmApprovalBtn: Locator;
  readonly openRejectModalBtn: Locator;
  readonly confirmRejectionBtn: Locator;
  constructor(page: Page) {
    super(page);

    this.openApproveModalBtn = page
      .getByTestId("role-request-list-button-4")
      .first();
    this.confirmApprovalBtn = page.getByTestId("confirmation-modal-button-2");
    this.openRejectModalBtn = page
      .getByTestId("role-request-list-button-5")
      .first();
    this.confirmRejectionBtn = page.getByTestId("confirmation-modal-button-2");
  }

  async gotoRoleChangeRequestPage() {
    await this.navigate("/role-request");
  }

  async approveRoleChange() {
    await this.openApproveModalBtn.click();
    await this.confirmApprovalBtn.click();
  }

  async assertRoleChangeApproval() {
    await expect(this.page.getByText("Role change request approved!")).toBeVisible();
  }

  async rejectRoleChange() {
    await this.openRejectModalBtn.click();
    await this.confirmRejectionBtn.click();
  }

  async assertRoleChangeRejection() {
    await expect(this.page.getByText("Role change request rejected!")).toBeVisible();
  }
}
