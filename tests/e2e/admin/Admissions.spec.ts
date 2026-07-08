import { test, APIRequestContext } from "@playwright/test";
import PageManager from "../../../pages/PageManager";
import { getAuthApiContext } from "../../../utils/getAuthApiContext";
import { randomUUID } from "crypto";
import dotenv from "dotenv";
dotenv.config();

test.use({ storageState: "playwright/.auth/admin.json" });

let apiContext: APIRequestContext;
let pm: PageManager;

test.describe("Admission Flow", () => {
  let admissionId: string;
  const uniqueId = randomUUID();

  test.beforeAll(async () => {
    apiContext = await getAuthApiContext(
      process.env.ADMIN_EMAIL!,
      process.env.ADMIN_PASSWORD!,
    );
  });
  test.beforeEach(async ({ page }) => {
    pm = new PageManager(page);

    const newAdmission = await apiContext.post("/api/admin/user-admissions", {
      data: {
        firstName: "Juan",
        lastName: "Dela Cruz",
        user_email: `playwrighttest3+${uniqueId}@email.com`,
        password: "12345678",
      },
    });

    const admissionData = await newAdmission.json();
    admissionId = admissionData.admission.admission_id;
  });
  test.afterEach(async () => {
    await apiContext.delete(`/api/admin/user-admissions/${admissionId}`);
  });

  test("View Admissions", async () => {
    await pm.admissionsPage.goto();
    await pm.admissionsPage.viewAdmission();
  });

  test("Approve admission", async () => {
    await pm.admissionsPage.goto();
    await pm.admissionsPage.approveAdmission();
    await pm.admissionsPage.confirmApproval();
  });

  test("Reject admission", async () => {
    await pm.admissionsPage.goto();
    await pm.admissionsPage.rejectAdmission();
    await pm.admissionsPage.confirmRejection();
  });
});
