import { test, expect } from "@playwright/test";
import PageManager from "../../pages/PageManager";

test.use({ storageState: "playwright/.auth/admin.json" });

let pm: PageManager;

test.describe("Testing for admin", async () => {
  test.beforeEach(async ({ page }) => {
    pm = new PageManager(page);
  });

  test.afterEach(async ({ page }) => {
    page.close();
  });

  test("Navigate after logging in", async () => {
    await pm.homepage.navigate();
  });

  test("Check role badge", async () => {
    test.fail(true, "Known bug: role badge intermittently shows wrong role");
    await pm.homepage.navigate();
    await pm.homepage.getRoleBadge("Admin");
  });
});
