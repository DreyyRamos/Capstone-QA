import { test } from "@playwright/test";
import PageManager from "../../../pages/PageManager";

let pm: PageManager;

test.describe("Publication flow validation no account logged in", async () => {
  test.beforeEach(async ({ page }) => {
    pm = new PageManager(page);
  });

  test("Like publication as guest", async () => {
    await pm.publicationsPage.gotoPubs();
    await pm.publicationsPage.likePubsNoUser();
    await pm.publicationsPage.assertNoAccountMessage();
  });

  test("Comment as guest", async () => {
    await pm.publicationsPage.gotoPubs();
    await pm.publicationsPage.commentPubsNoUser();
    await pm.publicationsPage.assertNoAccountMessage();
  });

  test("Report publications as guest", async () => {
    await pm.publicationsPage.gotoPubs();
    await pm.publicationsPage.reportPubsNoUser();
    await pm.publicationsPage.assertNoAccountMessage();
  });

  test("Like comment as guest", async () => {
    await pm.publicationsPage.gotoPubs();
    await pm.publicationsPage.likeCommentNoUser();
    await pm.publicationsPage.assertNoAccountMessage();
  });

  test("Report a comment as guest", async () => {
    await pm.publicationsPage.gotoPubs();
    await pm.publicationsPage.reportCommentNoUser();
    await pm.publicationsPage.assertNoAccountMessage();
  });
});
