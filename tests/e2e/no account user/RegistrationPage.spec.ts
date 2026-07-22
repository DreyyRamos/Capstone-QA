import { expect, test, Page } from "@playwright/test";
import PageManager from "../../../pages/PageManager";
import { randomUUID } from "crypto";

let pm: PageManager;

test.describe("Registration flow", () => {
  let uniqueId = randomUUID();
  test.beforeEach(async ({ page }) => {
    pm = new PageManager(page);
  });

  test("Sign-up a new user", async () => {
    await pm.registrationPage.goto();
    await pm.registrationPage.signUp(
      "new user 1",
      "to test 1",
      `newUserToTest${uniqueId}@email.com`,
    );
    await pm.registrationPage.assertMessage();
  });
});
