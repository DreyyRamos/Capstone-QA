import { test, APIRequestContext, expect } from "@playwright/test";
import { getAuthApiContext } from "../../../utils/getAuthApiContext";
import dotenv from "dotenv";
dotenv.config();

let apiContext: APIRequestContext;

test.describe("API testing for publications", async () => {
  let postId: string;

  test.beforeAll(async () => {
    apiContext = await getAuthApiContext(
      process.env.ADMIN_EMAIL!,
      process.env.ADMIN_PASSWORD!,
    );
  });
  test.beforeEach(async ({ page }) => {
    const newPost = await apiContext.post("/api/publications/create", {
      data: {
        title: "THis is test from playwright",
        excerpt: "This is test excerpt",
        content: "This is test content",
      },
    });
    expect(newPost.ok()).toBeTruthy();
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

    expect(editPub.ok()).toBeTruthy();
  });

  test("Create publication with invalid data type", async () => {
    const invalidPub = await apiContext.post("/api/publications/create", {
      data: {
        title: 1,
        excerpt: 1,
        content: false,
      },
    });
    expect(invalidPub.ok()).toBeFalsy();
  });

  test("Edit publication with invalid data type", async () => {
    const invalidPub = await apiContext.put(`/api/publications/${postId}`, {
      data: {
        title: false,
        excerpt: 1,
        content: false,
      },
    });

    expect(invalidPub.ok()).toBeFalsy();
  });

  test("Delete a publication with invalid id", async () => {
    const deletePub = await apiContext.delete(`/api/publications/invalidPubId`);

    expect(deletePub.ok()).toBeFalsy();
  });

  test("Publications endpoints", async () => {
    const res = await apiContext.get("/api/publications");
    const data = await res.json();
    expect(data.status).toBe(200);
  });
});
