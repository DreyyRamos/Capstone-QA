import { test, expect } from "@playwright/test";
import PageManager from "../pages/PageManager";

let pm: any;

test.describe("Homepage test", () => {
  test.beforeEach(async ({ page }) => {
    pm = new PageManager(page);
  });
  test.afterEach(async ({ page }) => {
    await page.close();
  });

  test("Login with invalid credentials", async () => {
    await pm.loginpage.navigate();
    await pm.loginpage.login("asd@email.com", "1234556723");
    await pm.loginpage.assertErrorMessage("Invalid credentials");
  });

  test("Login with correct credentials", async () => {
    await pm.loginpage.navigate();
    await pm.loginpage.login(process.env.EMAIL, process.env.STUDENTPASSWORD);
  });

  test("Browse Publication", async () => {
    await pm.homepage.navigate();
    await pm.homepage.browsePublications();
  });
});
