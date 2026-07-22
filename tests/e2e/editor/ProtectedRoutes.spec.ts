import { test, expect } from "@playwright/test";
import PageManager from "../../../pages/PageManager";

test.use({ storageState: "playwright/.auth/editor.json" });

let pm: PageManager;

test.describe("Protected routes from editor side", () => {
  test.beforeEach(async ({ page }) => {
    pm = new PageManager(page);
  });

  test("Editor accessing users page", async ({ page }) => {
    await pm.usersPage.gotoUsersPage();
    await expect(
      page.getByRole("heading", { name: "- Unauthorized" }),
    ).toBeVisible();
  });

  test("Editor accessing admissions page", async ({ page }) => {
    await pm.admissionsPage.goto();
    await expect(
      page.getByRole("heading", { name: "- Unauthorized" }),
    ).toBeVisible();
  });

  test("Editor accessing moderation page", async ({ page }) => {
    await pm.moderationPage.gotoModerationPage();
    await expect(
      page.getByRole("heading", { name: "- Unauthorized" }),
    ).toBeVisible();
  });

  // WIP
  //   test("Editor accessing role change requests page", async ({ page }) => {
  //     await pm.
  //     await expect(
  //       page.getByRole("heading", { name: "- Unauthorized" }),
  //     ).toBeVisible();
  //   });
});
