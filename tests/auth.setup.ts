import { test as setup, expect } from "@playwright/test";
import dotenv from "dotenv";
dotenv.config();

const roles = [
  {
    name: "student",
    email: process.env.STUDENT_EMAIL!,
    password: process.env.STUDENT_PASSWORD!,
  },
  {
    name: "editor",
    email: process.env.EDITOR_EMAIL!,
    password: process.env.EDITOR_PASSWORD!,
  },
  {
    name: "moderator",
    email: process.env.MODERATOR_EMAIL!,
    password: process.env.MODERATOR_PASSWORD!,
  },
  {
    name: "admin",
    email: process.env.ADMIN_EMAIL!,
    password: process.env.ADMIN_PASSWORD!,
  },
];

for (const role of roles) {
  setup(`Authenticate as ${role.name}`, async ({ page }) => {
    if (!role.name || !role.email || !role.password) {
      throw new Error(`Missing credentials for ${role.name} in .env file`);
    }

    await page.goto("/login");
    await page.locator("#email").fill(role.email);
    await page.locator("#password").fill(role.password);
    await page.locator("button[type='submit']").click();

    await page.waitForLoadState("networkidle");
    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");

    await page.context().storageState({
      path: `playwright/.auth/${role.name}.json`,
    });
  });
}
