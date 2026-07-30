import { test, APIRequestContext, expect } from "@playwright/test";
import { getAuthApiContext } from "../../../utils/getAuthApiContext";
import dotenv from "dotenv";
dotenv.config();

let apiContext: APIRequestContext;

test.describe("API testing for forum", () => {
  let forumId: string;
  test.beforeAll(async () => {
    apiContext = await getAuthApiContext(
      process.env.ADMIN_EMAIL!,
      process.env.ADMIN_PASSWORD!,
    );
  });
  test.beforeEach(async () => {
    const newForum = await apiContext.post("/api/forums/create", {
      data: {
        topicTitle: "Forum from API test",
        description: "Forum from API test",
      },
    });
    expect(newForum.ok()).toBeTruthy();
    const forumData = await newForum.json();
    forumId = forumData.forum.forumId;
  });

  test.afterEach(async () => {
    if (forumId) {
      await apiContext.delete(`/api/forums/${forumId}`);
    }
  });

  test("Edit forum", async () => {
    const editForum = await apiContext.put(`/api/forums/${forumId}`, {
      data: {
        topicTitle: "Updated forum from API test",
        description: "Updated forum from API test",
      },
    });

    expect(editForum.ok()).toBeTruthy();
  });

  test("Create a forum with invalid data type", async () => {
    const invalidForum = await apiContext.post("/api/forums/create", {
      data: {
        topicTitle: 1,
        description: false,
      },
    });
    expect(invalidForum.ok()).toBeFalsy();
  });

  test("Edit a forum with invalid data type", async () => {
    const editForum = await apiContext.put(`/api/forums/${forumId}`, {
      data: {
        topicTitle: false,
        description: 1,
      },
    });

    expect(editForum.ok()).toBeFalsy();
  });

  test("Delete a forum with invalid id", async () => {
    const deleteForum = await apiContext.delete(`/api/forums/invalidId`);

    expect(deleteForum.ok()).toBeFalsy();
  });
});
