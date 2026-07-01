import { APIRequestContext, request } from "@playwright/test";

export async function getAuthApiContext(
  email: string,
  password: string,
): Promise<APIRequestContext> {
  const authContext = await request.newContext({
    baseURL: process.env.BASE_URL!,
  });

  const loginResponse = await authContext.post("/api/login", {
    data: { email, password },
  });

  if (!loginResponse.ok()) {
    throw new Error(
      `Login failed: ${loginResponse.status()} ${await loginResponse.text()}`,
    );
  }

  const authData = await loginResponse.json();
  const token = authData.token;

  await authContext.dispose();

  return request.newContext({
    baseURL: process.env.BASE_URL!,
    extraHTTPHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });
}
