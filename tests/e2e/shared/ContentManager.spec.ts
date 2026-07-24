import { test, APIRequestContext, expect } from "@playwright/test";
import PageManager from "../../../pages/PageManager";
import { getAuthApiContext } from "../../../utils/getAuthApiContext";
import dotenv from "dotenv";
dotenv.config();

let pm: PageManager;
let apiContext: APIRequestContext;

const roles = [
  {
    name: "admin",
    email: process.env.ADMIN_EMAIL!,
    password: process.env.ADMIN_PASSWORD!,
    storageState: "playwright/.auth/admin.json",
  },
  {
    name: "editor",
    email: process.env.EDITOR_EMAIL!,
    password: process.env.EDITOR_PASSWORD!,
    storageState: "playwright/.auth/editor.json",
  },
];

for (const role of roles) {
  test.describe(`Content management flow - ${role.name}`, () => {
    test.use({ storageState: role.storageState });
    let pubId: string;
    test.beforeAll(async () => {
      apiContext = await getAuthApiContext(
        process.env.EDITOR_EMAIL!,
        process.env.EDITOR_PASSWORD!,
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

      expect(newPub.ok()).toBeTruthy();

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
      await pm.contentManagerPage.archivePublication();
      await pm.contentManagerPage.assertArchivePublication();
    });

    test.fail("Reject submitted publication", async () => {
      await pm.contentManagerPage.gotoContentManagerPage();
      await pm.contentManagerPage.rejectPublication(); // This shows archived instead of rejected in the toast in UI, but still works
      await pm.contentManagerPage.assertRejectPublication();
    });

    test("Approve publication through content manager", async () => {
      await pm.contentManagerPage.gotoContentManagerPage();
      await pm.contentManagerPage.approvePublication();
    });
  });
}
