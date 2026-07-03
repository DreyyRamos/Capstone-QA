import { test, expect, APIRequestContext } from "@playwright/test";
import PageManager from "../../pages/PageManager";
import { getAuthApiContext } from "../../utils/getAuthApiContext";
import dotenv from "dotenv";
dotenv.config();

test.use({ storageState: "playwright/.auth/admin.json" });

let apiContext: APIRequestContext;
let pm: PageManager;

test.describe("Testing for admin", async () => {
  let postId: string;

  test.beforeAll(async () => {
    apiContext = await getAuthApiContext(
      process.env.ADMIN_EMAIL!,
      process.env.ADMIN_PASSWORD!,
    );
  });
  test.beforeEach(async ({ page, request }) => {
    pm = new PageManager(page);
    const newPost = await request.post("/api/publications/create", {
      data: {
        title: "THis is test from playwright",
        excerpt: "This is test excerpt",
        content: "This is test content",
      },
    });
    const postData = await newPost.json();
    postId = postData.pubId;
  });

  test.afterEach(async ({ page, request }) => {
    await request.delete(`/api/publications/${postId}`);
    page.close();
  });

  test("Navigate after logging in", async () => {
    await pm.homepage.goto();
  });

  test("Creating pubs as admin", async () => {
    await pm.publicationsPage.goto();
    await pm.publicationsPage.fillPubsInfo();
    await pm.publicationsPage.submit();
    await pm.publicationsPage.confirmSubmit();
  });
});
