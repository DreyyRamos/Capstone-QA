import { test, expect, APIRequestContext } from "@playwright/test";
import PageManager from "../../../pages/PageManager";
import { getAuthApiContext } from "../../../utils/getAuthApiContext";
import dotenv from "dotenv";
dotenv.config();

test.use({ storageState: "playwright/.auth/admin.json" });

let apiContext: APIRequestContext;
let pm: PageManager;

test.describe("Change user role by Admin", () => {
  let currentRole: string;
  test.beforeAll(async () => {
    apiContext = await getAuthApiContext(
      process.env.ADMIN_EMAIL!,
      process.env.ADMIN_PASSWORD!,
    );
  });

  test.beforeEach(async ({ page }) => {
    pm = new PageManager(page);

    const res = await apiContext.get(`/api/admin/fetch-users`);
    const user = await res.json();
    currentRole = user.users[0].role;
  });

  test("Change user role", async () => {
    const targetRole = currentRole === "EDITOR" ? "STUDENT" : "EDITOR";
    await pm.usersPage.gotoUsersPage();
    await pm.usersPage.changeUserRole(targetRole);
    await pm.usersPage.asserUserRoleChangedMsg(targetRole);
  });
});
