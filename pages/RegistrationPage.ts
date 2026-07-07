import { expect, Locator, Page } from "@playwright/test";
import BasePage from "./BasePage";

export default class RegistrationPage extends BasePage {
  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly email: Locator;
  readonly password: Locator;
  readonly bio: Locator;
  readonly phoneNumber: Locator;
  readonly location: Locator;
  readonly interests: Locator;
  readonly addInterest: Locator;
  readonly submitBtn: Locator;

  constructor(page: Page) {
    super(page);
    this.firstName = page.getByRole("textbox", { name: "First Name *" });
    this.lastName = page.getByRole("textbox", { name: "Last Name" });
    this.email = page.getByRole("textbox", { name: "Email *" });
    this.password = page.getByRole("textbox", { name: "Password *" });
    this.bio = page.getByRole("textbox", { name: "Bio" });
    this.phoneNumber = page.getByRole("textbox", { name: "Phone Number" });
    this.location = page.getByRole("textbox", { name: "Location" });
    this.interests = page.getByRole("textbox", { name: "Add an interest..." });
    this.addInterest = page.getByTestId("page-button-3");
    this.submitBtn = page.getByTestId("page-button-4");
  }

  async goto() {
    await this.navigate("/register");
  }

  pickInterest(interest: string): Locator {
    return this.page.getByText(interest, { exact: true });
  }

  async signUp(firstname: string, lastname: string, email: string) {
    await this.firstName.fill(firstname);
    await this.lastName.fill(lastname);
    await this.email.fill(email);
    await this.password.fill("12345678");
    await this.bio.fill("Hello I'm JDC");
    await this.phoneNumber.fill("09123456789");
    await this.location.fill("Quezon City");
    await this.interests.fill("Programming");
    await this.addInterest.click();
    await this.pickInterest("Art").click();
    await this.pickInterest("Sports").click();
    await this.pickInterest("Music").click();
    await this.submitBtn.click();
  }

  //   async assertMessage(msg: string) {
  //     let regMsg = await this.page.getByRole("listitem");
  //     expect(regMsg).toContainText(msg);
  //   }
}
