import { expect, test, Page } from "@playwright/test";
import PageManager from "../../../pages/PageManager";

let pm: PageManager;

test.describe("Registration flow", async () => {
  test.beforeEach(async ({ page }) => {
    pm = new PageManager(page);
  });
  test.afterEach(async ({ page }) => {
    page.close();
  });

  test("Sign-up a new user", async () => {
    await pm.registrationPage.goto();
    await pm.registrationPage.signUp(
      "new user 1",
      "to test 1",
      "newUserToTest1@email.com",
    );
    // await pm.registrationPage.assertMessage("User registered successfully!");
  });
});
