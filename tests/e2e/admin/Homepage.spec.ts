import { test, expect } from "@playwright/test";
import PageManager from "../../../pages/PageManager";
import dotenv from "dotenv";
dotenv.config();

test.use({ storageState: "playwright/.auth/admin.json" });

let pm: PageManager;

test.describe("Testing for admin", async () => {
  test.beforeEach(async ({ page, request }) => {
    pm = new PageManager(page);
  });

  test.afterEach(async ({ page, request }) => {});

  test("Navigate after logging in", async () => {
    await pm.homepage.goto();
  });

  test("Creating pubs as admin", async () => {
    await pm.publicationsPage.goto();
    await pm.publicationsPage.fillPubsInfo();
    await pm.publicationsPage.submit();
    await pm.publicationsPage.confirmSubmit();
  });

  test.only("Change user role", async () => {
    await pm.usersPage.goto();
    await pm.usersPage.changeUserRole("Editor");
  });
});
