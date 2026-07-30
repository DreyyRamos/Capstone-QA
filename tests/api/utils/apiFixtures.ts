// tests/api/utils/apiFixtures.ts
import { test as base, expect, request } from "@playwright/test";
import { getAuthApiContext } from "../../../utils/getAuthApiContext";
import dotenv from "dotenv";
dotenv.config();

type ApiFixtures = {
  studentApiContext: Awaited<ReturnType<typeof getAuthApiContext>>;
  moderatorApiContext: Awaited<ReturnType<typeof getAuthApiContext>>;
  editorApiContext: Awaited<ReturnType<typeof getAuthApiContext>>;
  adminApiContext: Awaited<ReturnType<typeof getAuthApiContext>>;
};

export const test = base.extend<ApiFixtures>({
  studentApiContext: async ({}, use) => {
    const ctx = await getAuthApiContext(
      process.env.STUDENT_EMAIL!,
      process.env.STUDENT_PASSWORD!,
    );
    await use(ctx);
    await ctx.dispose();
  },
  moderatorApiContext: async ({}, use) => {
    const ctx = await getAuthApiContext(
      process.env.MODERATOR_EMAIL!,
      process.env.MODERATOR_PASSWORD!,
    );
    await use(ctx);
    await ctx.dispose();
  },
  editorApiContext: async ({}, use) => {
    const ctx = await getAuthApiContext(
      process.env.EDITOR_EMAIL!,
      process.env.EDITOR_PASSWORD!,
    );
    await use(ctx);
    await ctx.dispose();
  },
  adminApiContext: async ({}, use) => {
    const ctx = await getAuthApiContext(
      process.env.ADMIN_EMAIL!,
      process.env.ADMIN_PASSWORD!,
    );
    await use(ctx);
    await ctx.dispose();
  },
});

export { expect, request };
