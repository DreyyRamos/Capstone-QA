import { expect, test } from "@playwright/test";
import PageManager from "../../../pages/PageManager";

let pm: PageManager;

test.describe("Forum flow validation", async () => {
  test.beforeEach(async ({ page }) => {
    pm = new PageManager(page);
  });

  test("Create a forum without an account", async () => {
    await pm.forumPage.goto();
    await pm.forumPage.clickCreateButton();
    await pm.forumPage.assertNoAccountMessage();
  });
});
