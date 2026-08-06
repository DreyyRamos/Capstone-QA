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
  test.describe.serial(`Comment to a Publication - ${role.name}`, () => {
    test.use({ storageState: role.storageState });
    let pubId: string;
    test.beforeAll(async () => {
      apiContext = await getAuthApiContext(role.email, role.password);

      const newPub = await apiContext.post("/api/publications/create", {
        data: {
          title: "Pub for comment tests",
          excerpt: "Pub for comment tests",
          content: "Pub for comment tests",
        },
      });

      expect(newPub.ok()).toBeTruthy();

      const pubData = await newPub.json();
      pubId = pubData.publication.pubId;
    });

    test.beforeEach(async ({ page }) => {
      pm = new PageManager(page);
    });

    test.afterAll(async () => {
      if (pubId) {
        await apiContext.delete(`/api/publications/${pubId}`);
      }
    });

    test("Submit a parent comment", async () => {
      await pm.publicationsPage.gotoSpecificPub(pubId);
      await pm.publicationsPage.postComment();
      await pm.publicationsPage.assertParentComment();
    });

    test("Submit a reply to a parent comment", async () => {
      await pm.publicationsPage.gotoSpecificPub(pubId);
      await pm.publicationsPage.postReply();
      await pm.publicationsPage.assertReply();
    });

    test("Submit a reply to reply", async () => {
      await pm.publicationsPage.gotoSpecificPub(pubId);
      await pm.publicationsPage.postReplyToReply();
      await pm.publicationsPage.assertReplyToReply();
    });
  });
}
