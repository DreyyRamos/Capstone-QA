import { test, request, expect } from "../utils/apiFixtures";
import dotenv from "dotenv";
dotenv.config();

test.describe("Auth boundary tests", () => {
  test("Valid student token returns 200 and correct profile shape", async ({
    studentApiContext,
  }) => {
    const res = await studentApiContext.get("/api/user/me");
    expect(res.status()).toBe(200);

    const body = await res.json();
    expect(body).toHaveProperty("userData.email");
    expect(body).toHaveProperty("userData.role", "STUDENT");
  });

  test("Student cannot access moderator only endpoints", async ({
    studentApiContext,
  }) => {
    const res = await studentApiContext.get("/api/moderator/fetch-users");
    expect(res.status()).toBe(403);
  });

  test("Student cannot access editor only endpoints", async ({
    studentApiContext,
  }) => {
    const res = await studentApiContext.get(
      "/api/publications/editor/toReview",
    );
    expect(res.status()).toBe(403);
  });

  test("Student cannot access admin only endpoints", async ({
    studentApiContext,
  }) => {
    const res = await studentApiContext.get("/api/admin/user-admissions");
    expect(res.status()).toBe(403);
  });

  test("Editor cannot access admin only endpoints", async ({
    editorApiContext,
  }) => {
    const res = await editorApiContext.get("/api/admin/user-admissions");
    expect(res.status()).toBe(403);
  });

  test("Editor cannot access moderator only endpoints", async ({
    editorApiContext,
  }) => {
    const res = await editorApiContext.get("/api/moderator/fetch-users");
    expect(res.status()).toBe(403);
  });

  test("Moderator cannot access admin only endpoints", async ({
    moderatorApiContext,
  }) => {
    const res = await moderatorApiContext.get("/api/admin/user-admissions");
    expect(res.status()).toBe(403);
  });

  test("Moderator cannot access editor only endpoints", async ({
    moderatorApiContext,
  }) => {
    const res = await moderatorApiContext.get(
      "/api/publications/editor/toReview",
    );
    expect(res.status()).toBe(403);
  });
});
