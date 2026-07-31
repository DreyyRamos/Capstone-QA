import { test, expect } from "@playwright/test";
import dotenv from "dotenv";
dotenv.config();

test.describe("Login API tests", () => {
  test("Login with missing password", async ({ request }) => {
    const res = await request.post("/api/login", {
      data: {
        email: process.env.STUDENT_EMAIL!,
        password: "",
      },
    });
    expect(res.status()).toBe(400);
  });

  test("Login with missing email", async ({ request }) => {
    const res = await request.post("/api/login", {
      data: {
        email: "",
        password: process.env.STUDENT_PASSWORD!,
      },
    });
    expect(res.status()).toBe(400);
  });

  test("Login with no credentials", async ({ request }) => {
    const res = await request.post("/api/login", {
      data: {
        email: "",
        password: "",
      },
    });
    expect(res.status()).toBe(400);
  });

  test("Login with wrong email", async ({ request }) => {
    const res = await request.post("/api/login", {
      data: {
        email: "wrongemail@email.com",
        password: process.env.STUDENT_PASSWORD!,
      },
    });
    expect(res.status()).toBe(400);
  });

  test("Login with wrong password", async ({ request }) => {
    const res = await request.post("/api/login", {
      data: {
        email: process.env.STUDENT_EMAIL!,
        password: "wrongpassword",
      },
    });
    expect(res.status()).toBe(400);
  });

  test("Login with valid credentials", async ({ request }) => {
    const res = await request.post("/api/login", {
      data: {
        email: process.env.STUDENT_EMAIL,
        password: process.env.STUDENT_PASSWORD!,
      },
    });
    expect(res.status()).toBe(200);
  });
});
