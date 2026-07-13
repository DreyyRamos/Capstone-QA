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
  let forumIdToEdit: string;

  test.beforeAll(async () => {
    apiContext = await getAuthApiContext(
      process.env.ADMIN_EMAIL!,
      process.env.ADMIN_PASSWORD!,
    );
  });
  test.beforeEach(async ({ page }) => {
    pm = new PageManager(page);

    const newForum = await apiContext.post("/api/forums/create", {
      data: {
        topicTitle: "Forum to edit",
        description: "Forum desctiption to edit",
      },
    });

    const forumData = await newForum.json();
    forumIdToEdit = forumData.forum.forumId;
  });
  test.afterEach(async () => {
    if (forumId && forumIdToEdit && forumId !== forumIdToEdit) {
      await apiContext.delete(`/api/forums/${forumId}`);
      await apiContext.delete(`/api/forums/${forumIdToEdit}`);
    } else if (forumId) {
      await apiContext.delete(`/api/forums/${forumId}`);
    } else if (forumIdToEdit) {
      await apiContext.delete(`/api/forums/${forumIdToEdit}`);
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

  test.fail("Update or edit a forum", async () => {
    await pm.forumPage.gotoEditForum(forumIdToEdit);
    await pm.forumPage.fillForumToEdit(
      "Edited forum title",
      "Edited forum content",
    );
    await pm.forumPage.submitEditedForum();
    await pm.forumPage.assertUpdatedForum(); // this should show "Forum updated successully!" not Publication, everything else works
  });
});
