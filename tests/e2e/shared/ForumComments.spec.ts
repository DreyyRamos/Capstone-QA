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
  {
    name: "moderator",
    email: process.env.MODERATOR_EMAIL!,
    password: process.env.MODERATOR_PASSWORD!,
    storageState: "playwright/.auth/moderator.json",
  },
  {
    name: "student",
    email: process.env.STUDENT_EMAIL!,
    password: process.env.STUDENT_PASSWORD!,
    storageState: "playwright/.auth/student.json",
  },
];

for (const role of roles) {
  test.describe.serial(`Comment to a Forum - ${role.name}`, () => {
    test.use({ storageState: role.storageState });
    let forumId: string;
    test.beforeAll(async () => {
      apiContext = await getAuthApiContext(role.email, role.password);

      const newForum = await apiContext.post("/api/forums/create", {
        data: {
          topicTitle: "Pub for comment tests",
          description: "Pub for comment tests",
        },
      });

      expect(newForum.ok()).toBeTruthy();

      const forumData = await newForum.json();
      forumId = forumData.forum.forumId;
    });

    test.beforeEach(async ({ page }) => {
      pm = new PageManager(page);
    });

    test.afterAll(async () => {
      if (forumId) {
        await apiContext.delete(`/api/forums/${forumId}`);
      }
    });

    test("Submit a parent comment", async () => {
      await pm.forumPage.gotoSpecificForum(forumId);
      await pm.forumPage.postComment();
      await pm.forumPage.assertParentComment();
    });

    test("Submit a reply to a parent comment", async () => {
      await pm.forumPage.gotoSpecificForum(forumId);
      await pm.forumPage.postReply();
      await pm.forumPage.assertReply();
    });

    test("Submit a reply to reply", async () => {
      await pm.forumPage.gotoSpecificForum(forumId);
      await pm.forumPage.postReplyToReply();
      await pm.forumPage.assertReplyToReply();
    });
  });
}
