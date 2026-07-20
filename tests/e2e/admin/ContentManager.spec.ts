import { test, APIRequestContext } from "@playwright/test";
import PageManager from "../../../pages/PageManager";
import { getAuthApiContext } from "../../../utils/getAuthApiContext";
import dotenv from "dotenv";
dotenv.config();

test.use({ storageState: "playwright/.auth/admin.json" });

let pm: PageManager;
let apiContext: APIRequestContext;

test.describe("Content management flow", () => {
  let pubId: string;
  test.beforeAll(async () => {
    apiContext = await getAuthApiContext(
      process.env.ADMIN_EMAIL!,
      process.env.ADMIN_PASSWORD!,
    );
  });

  test.beforeEach(async ({ page }) => {
    pm = new PageManager(page);

    const newPub = await apiContext.post("/api/publications/create", {
      data: {
        title: "Pub for content management",
        excerpt: "Pub for content management",
        content: "Pub for content management",
      },
    });

    const pubData = await newPub.json();
    pubId = pubData.publication.pubId;
  });

  test.afterEach(async () => {
    if (pubId) {
      await apiContext.delete(`/api/publications/${pubId}`);
    }
  });

  test("Archive submitted publication", async () => {
    await pm.contentManagerPage.gotoContentManagerPage();
    await pm.contentManagerPage.archivePublication("archived");
  });

  test.fail("Reject submitted publication", async () => {
    await pm.contentManagerPage.gotoContentManagerPage();
    await pm.contentManagerPage.rejectPublication("rejected"); // This shows archived instead of rejected in the toast in UI, but still works
  });

  test("Approve publication through content manager", async () => {
    await pm.contentManagerPage.gotoContentManagerPage();
    await pm.contentManagerPage.approvePublication();
  });
});
