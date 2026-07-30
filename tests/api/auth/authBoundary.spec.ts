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

  test.fail(
    "Student cannot access moderator only endpoints",
    async ({ studentApiContext }) => {
      const res = await studentApiContext.get("/api/moderator/fetch-users"); // Students can access the moderator endpoint
      expect(res.status()).toBe(403);
    },
  );
});
