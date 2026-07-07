import { test, APIRequestContext } from "@playwright/test";
import PageManager from "../../pages/PageManager";
import { getAuthApiContext } from "../../utils/getAuthApiContext";
import dotenv from "dotenv";
dotenv.config();

test.use({ storageState: "playwright/.auth/admin.json" });

let apiContext: APIRequestContext;
let pm: PageManager;

test.describe("API testing for publications", async () => {
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

  test("Publications endpoints", async () => {
    const res = await apiContext.get("/api/publications");
    const data = await res.json();
    // console.log(data);
  });
});
