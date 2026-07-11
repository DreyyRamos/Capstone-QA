import { test, APIRequestContext } from "@playwright/test";
import PageManager from "../../../pages/PageManager";
import { CategoryOption } from "../../../pages/ForumPage";
import { getAuthApiContext } from "../../../utils/getAuthApiContext";
import dotenv from "dotenv";
dotenv.config();

test.use({ storageState: "playwright/.auth/admin.json" });

let apiContext: APIRequestContext;
let pm: PageManager;

test.describe("Forum flow in admin side", () => {
  let forumId: string;
  test.beforeAll(async () => {
    apiContext = await getAuthApiContext(
      process.env.ADMIN_EMAIL!,
      process.env.ADMIN_PASSWORD!,
    );
  });
  test.beforeEach(async ({ page }) => {
    pm = new PageManager(page);
  });
  test.afterEach(async () => {
    if (forumId) {
      await apiContext.delete(`/api/forums/${forumId}`);
    }
  });

  test("Create forum as admin", async () => {
    forumId = await pm.forumPage.createForum(
      CategoryOption.Sports,
      "My sports forum",
      "My sports contents",
      "My tags",
    );
    await pm.forumPage.assertForumCreatedMessage();
  });
});
