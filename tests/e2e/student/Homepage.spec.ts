import { test, expect } from "@playwright/test";
import PageManager from "../../../pages/PageManager";
import dotenv from "dotenv";
dotenv.config();

test.use({ storageState: "playwright/.auth/student.json" });
let pm: PageManager;

test.describe("Testing for student", () => {
  test.beforeEach(async ({ page }) => {
    pm = new PageManager(page);
  });

  test("Navigate after logging in", async ({ page }) => {
    await pm.homepage.goto();
    await expect(page).toHaveURL("/");
  });
});
