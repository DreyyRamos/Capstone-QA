import { test, expect } from "@playwright/test";
import PageManager from "../../../pages/PageManager";

test.use({ storageState: "playwright/.auth/moderator.json" });

let pm: PageManager;

test.describe("Protected routes from moderator side", () => {
  test.beforeEach(async ({ page }) => {
    pm = new PageManager(page);
  });

  test("Moderator accessing users page", async ({ page }) => {
    await pm.usersPage.gotoUsersPage();
    await expect(
      page.getByRole("heading", { name: "- Unauthorized" }),
    ).toBeVisible();
  });

  test("Moderator accessing admissions page", async ({ page }) => {
    await pm.admissionsPage.goto();
    await expect(
      page.getByRole("heading", { name: "- Unauthorized" }),
    ).toBeVisible();
  });

  test("Moderator accessing content manager page", async ({ page }) => {
    await pm.contentManagerPage.gotoContentManagerPage();
    await expect(
      page.getByRole("heading", { name: "- Unauthorized" }),
    ).toBeVisible();
  });

  // WIP
  //   test("Moderator accessing role change requests page", async ({ page }) => {
  //     await pm.
  //     await expect(
  //       page.getByRole("heading", { name: "- Unauthorized" }),
  //     ).toBeVisible();
  //   });
});
