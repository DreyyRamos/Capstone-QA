import { expect, test } from "@playwright/test";
import PageManager from "../../../pages/PageManager";

let pm: PageManager;

test.describe("Publication flow validation no account logged in", async () => {
  test.beforeEach(async ({ page }) => {
    pm = new PageManager(page);
  });

  test("Like Publication", async () => {
    await pm.publicationsPage.gotoPubs();
    await pm.publicationsPage.likePubsNoUser();
  });
});
