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
  let firstName: string;
  let lastName: string;
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
    firstName = admissionData.admission.firstName;
    lastName = admissionData.admission.lastName;
  });
  test.afterEach(async () => {
    await apiContext.delete(`/api/admin/user-admissions/${admissionId}`);
  });

  test("View Admissions", async () => {
    await pm.admissionsPage.goto();
    await pm.admissionsPage.viewAdmission();
    await pm.admissionsPage.assertViewAdmission();
  });

  test.fail("Approve admission", async () => {
    await pm.admissionsPage.goto();
    await pm.admissionsPage.approveAdmission();
    await pm.admissionsPage.confirmApproval();
    await pm.admissionsPage.assertApproveAdmission(); //this should show email sent with proper gmail account
  });

  test("Reject admission", async () => {
    await pm.admissionsPage.goto();
    await pm.admissionsPage.rejectAdmission();
    await pm.admissionsPage.confirmRejection();
    await pm.admissionsPage.assertRejectAdmission(
      firstName,
      lastName,
      admissionId,
    );
  });
});
