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
  let pubIdToEdit: string;

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
        title: "Pub to edit",
        excerpt: "Excerpt to edit",
        content: "Content to edit",
      },
    });

    const pubData = await newPub.json();
    pubIdToEdit = pubData.publication.pubId;
  });
  test.afterEach(async () => {
    if (pubId && pubIdToEdit && pubId !== pubIdToEdit) {
      await apiContext.delete(`/api/publications/${pubId}`);
      await apiContext.delete(`/api/publications/${pubIdToEdit}`);
    } else if (pubId) {
      await apiContext.delete(`/api/publications/${pubId}`);
    } else if (pubIdToEdit) {
      await apiContext.delete(`/api/publications/${pubIdToEdit}`);
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

  test("Update or edit a publication", async () => {
    await pm.publicationsPage.gotoEditPubs(pubIdToEdit);
    await pm.publicationsPage.fillPubsEditInfo(
      "Test Playwright: this is an edited title",
      "Test Playwright: this is an edited excerpt",
      "Test Playwright: this is an edited content",
    );
    await pm.publicationsPage.updatePubBtn();
    await pm.publicationsPage.assertUpdatedPubsMsg();
  });
});
