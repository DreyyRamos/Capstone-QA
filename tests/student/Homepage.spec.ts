import { test, expect, APIRequestContext } from "@playwright/test";
import PageManager from "../../pages/PageManager";
import { getAuthApiContext } from "../../utils/getAuthApiContext";
import dotenv from "dotenv";
dotenv.config();

test.use({ storageState: "playwright/.auth/student.json" });

let apiContext: APIRequestContext;
let pm: PageManager;

test.describe("Testing for student", async () => {
  test.beforeAll(async () => {
    apiContext = await getAuthApiContext(
      process.env.STUDENT_EMAIL!,
      process.env.STUDENT_PASSWORD!,
    );
  });

  test.beforeEach(async ({ page }) => {
    pm = new PageManager(page);
  });

  test.afterEach(async ({ page }) => {
    page.close();
  });

  test("Navigate after logging in", async () => {
    await pm.homepage.navigate();
  });

  test("Check role badge", async () => {
    test.fail(true, "Known bug: role badge intermittently shows wrong role");
    await pm.homepage.navigate();
    await pm.homepage.getRoleBadge("Editor");
  });

  test("Publications endpoints", async () => {
    const res = await apiContext.get("/api/publications");
    const data = await res.json();
    // console.log(data);
  });
});
