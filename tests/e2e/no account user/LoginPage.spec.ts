import { test } from "@playwright/test";
import PageManager from "../../../pages/PageManager";
import dotenv from "dotenv";
dotenv.config();

let pm: PageManager;

test.describe("Login flow", () => {
  test.beforeEach(async ({ page }) => {
    pm = new PageManager(page);
  });

  test("Login with invalid credentials", async () => {
    await pm.loginpage.gotoLoginPage();
    await pm.loginpage.login("wrongemail@email.com", "wrongpassword");
    await pm.loginpage.assertErrorMessage();
  });

  test("Login with valid credentials", async () => {
    await pm.loginpage.gotoLoginPage();
    await pm.loginpage.login(
      process.env.STUDENT_EMAIL!,
      process.env.STUDENT_PASSWORD!,
    );
    await pm.loginpage.assertLoginSuccess();
  });
});
