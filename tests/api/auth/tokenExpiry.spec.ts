import { test, expect, request } from "../utils/apiFixtures";
import dotenv from "dotenv";
dotenv.config();

test.describe("Token tests", () => {
  test("No provided token returns status 401", async () => {
    const context = await request.newContext({
      baseURL: process.env.BASE_URL!,
    });
    const res = await context.get("/api/user/me");
    expect(res.status()).toBe(401);
    await context.dispose();
  });

  test("Malformed provided token returns status 500", async () => {
    const context = await request.newContext({
      baseURL: process.env.BASE_URL!,
      extraHTTPHeaders: { Authorization: "Bearer not.a.real.token" },
    });
    const res = await context.get("/api/user/me");
    expect(res.status()).toBe(500);
    await context.dispose();
  });
});
