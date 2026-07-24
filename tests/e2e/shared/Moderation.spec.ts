import { test, APIRequestContext } from "@playwright/test";
import PageManager from "../../../pages/PageManager";
import { getAuthApiContext } from "../../../utils/getAuthApiContext";
import { randomUUID } from "crypto";
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
    name: "moderator",
    email: process.env.MODERATOR_EMAIL!,
    password: process.env.MODERATOR_PASSWORD!,
    storageState: "playwright/.auth/moderator.json",
  },
];

for (const role of roles) {
  test.describe(`Moderation flow - ${role.name}`, () => {
    test.use({ storageState: role.storageState });
    let pubIdToReport: string;
    let newUserId: string;
    let reportId: string;
    let uniqueId = randomUUID();

    test.beforeAll(async () => {
      apiContext = await getAuthApiContext(
        process.env.MODERATOR_EMAIL!,
        process.env.MODERATOR_PASSWORD!,
      );
    });
    test.beforeEach(async ({ page }) => {
      pm = new PageManager(page);

      const newUser = await apiContext.post("/api/admin/create-user", {
        data: {
          email: `testUser${uniqueId}@email.com`,
          firstName: "test",
          lastName: "name",
          password: "12345678",
        },
      });

      const userData = await newUser.json();
      newUserId = userData.user.id;

      const pubToReport = await apiContext.post("/api/publications/create", {
        data: {
          title: "Pub to report",
          excerpt: "Pub to report",
          content: "Pub to report",
          status: "PUBLISHED",
        },
      });
      const pubData = await pubToReport.json();
      pubIdToReport = pubData.publication.pubId;

      const newReport = await apiContext.post("/api/reports", {
        data: {
          contentType: "PUBLICATION",
          reportedContent: pubData.publication.title,
          reportReason: "Harassment or bullying",
          description: "I am reporting it",
          pubId: pubIdToReport,
        },
      });

      const reportData = await newReport.json();
      reportId = reportData.report.reportId;
    });

    test.afterEach(async () => {
      if (pubIdToReport && newUserId && reportId) {
        await apiContext.delete(`/api/publications/${pubIdToReport}`);
        await apiContext.delete(`/api/admin/create-user/${newUserId}`);
        await apiContext.delete(`/api/reports/${reportId}`);
      }
    });

    test("Delete reported publication", async () => {
      await pm.moderationPage.gotoModerationPage();
      await pm.moderationPage.deleteReportedContent();
    });
  });
}
