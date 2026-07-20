import { test, APIRequestContext, expect } from "@playwright/test";
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
  test.beforeEach(async ({ page }) => {
    pm = new PageManager(page);
    const newPost = await apiContext.post("/api/publications/create", {
      data: {
        title: "THis is test from playwright",
        excerpt: "This is test excerpt",
        content: "This is test content",
      },
    });
    const postData = await newPost.json();
    postId = postData.publication.pubId;
  });

  test.afterEach(async () => {
    await apiContext.delete(`/api/publications/${postId}`);
  });

  test("Edit publication", async () => {
    const editPub = await apiContext.put(`/api/publications/${postId}`, {
      data: {
        title: "New Pub edited",
        excerpt: "New Excerpt edited", // excerpt should be included in edit pub enpoint, right now it is not included. See console log for detials
        content: "New Content edited",
      },
    });

    const editedPub = await editPub.json();
  });

  test("Publications endpoints", async () => {
    const res = await apiContext.get("/api/publications");
    const data = await res.json();
    expect(data.status).toBe(200);
  });
});
