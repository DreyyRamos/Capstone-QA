import { test, expect } from "@playwright/test";
import PageManager from "../../pages/PageManager";

test.use({ storageState: "playwright/.auth/student.json" });

let pm: PageManager;

test.describe("Testing for student", async () => {
  test.beforeEach(async ({ page }) => {
    pm = new PageManager(page);
  });

  test.afterEach(async ({ page }) => {
    page.close();
  });

  test("Navigate after logging in", async () => {
    await pm.homepage.navigate();
  });
});
