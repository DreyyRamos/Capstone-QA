import { test, APIRequestContext, expect } from "@playwright/test";
import PageManager from "../../../pages/PageManager";
import { getAuthApiContext } from "../../../utils/getAuthApiContext";
import { randomUUID } from "crypto";
import dotenv from "dotenv";
dotenv.config();

test.use({ storageState: "playwright/.auth/admin.json" });

let pm: PageManager;
let apiContext: APIRequestContext;

test.describe("Role change requests flow", () => {
  let newUserId: string;
  let requestId: string;
  test.beforeAll(async () => {
    apiContext = await getAuthApiContext(
      process.env.ADMIN_EMAIL!,
      process.env.ADMIN_PASSWORD!,
    );
  });

  test.beforeEach(async ({ page }) => {
    let uniqueId = randomUUID();
    pm = new PageManager(page);

    const newUser = await apiContext.post("/api/admin/create-user", {
      data: {
        email: `testUser${uniqueId}@email.com`,
        firstName: "test",
        lastName: "name",
        password: "12345678",
      },
    });

    expect(newUser.ok()).toBeTruthy();

    const userData = await newUser.json();
    newUserId = userData.user.id;

    const newRoleChangeRequest = await apiContext.post(
      "/api/role-change-request",
      {
        data: {
          userId: userData.user.id,
          firstName: userData.user.firstName,
          lastName: userData.user.lastName,
          userEmail: userData.user.email,
          currentRole: userData.user.role,
          requestedRole: "EDITOR",
          reason:
            "Because I want to share some articles and publications I personally created. To help other students and educate them.",
        },
      },
    );

    const roleChangeData = await newRoleChangeRequest.json();
    requestId = roleChangeData.changeRole.request_id;
  });

  test.afterEach(async () => {
    if (newUserId && requestId) {
      await apiContext.delete(`/api/admin/create-user/${newUserId}`);
      await apiContext.delete(
        `/api/admin/role-change-request-deletion/${requestId}`,
      );
    }
  });

  test("Approve role change request", async () => {
    await pm.roleChangeRequestPage.gotoRoleChangeRequestPage();
    await pm.roleChangeRequestPage.approveRoleChange();
    await pm.roleChangeRequestPage.assertRoleChangeApproval();
  });

  test("Reject role change request", async () => {
    await pm.roleChangeRequestPage.gotoRoleChangeRequestPage();
    await pm.roleChangeRequestPage.rejectRoleChange();
    await pm.roleChangeRequestPage.assertRoleChangeRejection();
  });
});
