import { expect, test, Page } from "@playwright/test";
import PageManager from "../../../pages/PageManager";

let pm: PageManager;

test.describe("No logged in account validation", async () => {
  test.beforeEach(async ({ page }) => {
    pm = new PageManager(page);
  });

  test("Create publication without account", async () => {
    await pm.homepage.goto();
    await pm.homepage.browsePubs();
    await pm.homepage.createPubsNoAccount();
    await pm.homepage.noAccountMessage();
  });
});
