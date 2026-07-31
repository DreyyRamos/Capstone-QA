import { test, request, expect } from "../utils/apiFixtures";
import dotenv from "dotenv";
import { randomUUID } from "crypto";
dotenv.config();

test.describe("User registration API test", () => {
  let uniqueId = randomUUID();
  let admissionId: string;

  test.afterEach(async ({ adminApiContext }) => {
    await adminApiContext.delete(`/api/admin/user-admissions/${admissionId}`);
  });

  test("Duplicate email when new user register", async ({ request }) => {
    const res = await request.post("/api/register", {
      form: {
        user_email: process.env.STUDENT_EMAIL!,
        firstName: "New",
        lastName: "User",
        password: "newpassword",
      },
    });

    expect(res.status()).toBe(409);
  });

  test.fail("Password not enough character", async ({ request }) => {
    const res = await request.post("/api/register", {
      form: {
        user_email: `definitelynewuser+${uniqueId}@email.com`,
        firstName: "New",
        lastName: "User",
        password: "1234567", // this should not allow 8 characters below
      },
    });

    const data = await res.json();
    admissionId = data.user.admission_id;
    expect(res.status()).toBe(400);
  });

  test("User did not provide email", async ({ request }) => {
    const res = await request.post("/api/register", {
      form: {
        user_email: "",
        firstName: "New",
        lastName: "User",
        password: "12345678",
      },
    });

    expect(res.status()).toBe(400);
  });

  test("User did not provide password", async ({ request }) => {
    const res = await request.post("/api/register", {
      form: {
        user_email: `definitelynewuser+${uniqueId}@email.com`,
        firstName: "New",
        lastName: "User",
        password: "",
      },
    });

    expect(res.status()).toBe(400);
  });

  test("User did not provide first name", async ({ request }) => {
    const res = await request.post("/api/register", {
      form: {
        user_email: `definitelynewuser+${uniqueId}@email.com`,
        firstName: "",
        lastName: "User",
        password: "12345678",
      },
    });

    expect(res.status()).toBe(400);
  });

  test("Valid user registration", async ({ request }) => {
    const res = await request.post("/api/register", {
      form: {
        user_email: `definitelynewuser+${uniqueId}@email.com`,
        firstName: "New",
        lastName: "User",
        password: "12345678",
      },
    });

    const data = await res.json();
    admissionId = data.user.admission_id;
    expect(res.ok()).toBeTruthy();
  });
});
