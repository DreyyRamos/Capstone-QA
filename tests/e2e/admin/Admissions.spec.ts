import { expect, test, Page } from "@playwright/test";
import PageManager from "../../../pages/PageManager";

test.use({ storageState: "playwright/.auth/admin.json" });
let pm: PageManager;

test.describe("Admission Flow", async () => {
  test.beforeEach(async ({ page }) => {
    pm = new PageManager(page);
  });
  test.afterEach(async ({ page }) => {
    page.close();
  });

  test("View Admissions", async () => {
    await pm.admissionsPage.goto();
    await pm.admissionsPage.viewAdmission();
  });

  test("Approve Admissions", async () => {
    await pm.admissionsPage.goto();
    await pm.admissionsPage.approveAdmission();
    await pm.admissionsPage.confirmApproval();
  });
});
