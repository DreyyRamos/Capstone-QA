import { test, expect, APIRequestContext } from "@playwright/test";
import PageManager from "../../../pages/PageManager";
import { getAuthApiContext } from "../../../utils/getAuthApiContext";
import dotenv from "dotenv";
dotenv.config();

test.use({ storageState: "playwright/.auth/admin.json" });

let apiContext: APIRequestContext;
let pm: PageManager;

test.describe("Testing for admin", () => {
  let pubId: string;
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
    if (pubId) {
      await apiContext.delete(`/api/publications/${pubId}`);
    }
  });

  test("Navigate after logging in", async () => {
    await pm.homepage.goto();
  });

  test("Creating pubs as admin", async () => {
    await pm.publicationsPage.gotoCreate();
    await pm.publicationsPage.fillPubsInfo();
    await pm.publicationsPage.submit();
    pubId = await pm.publicationsPage.confirmSubmit();
    await pm.publicationsPage.assertMessage(
      "Publication created and is pending for review!",
    );
  });

  test("Change user role", async () => {
    await pm.usersPage.goto();
    await pm.usersPage.changeUserRole("Editor");
  });
});
