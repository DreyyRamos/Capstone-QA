import { Page, Locator } from "@playwright/test";

export default class CommonActions {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigate(url: string) {
    await this.page.goto(url);
  }

  getButton(name: string): Locator {
    return this.page.getByRole("button", { name });
  }

  async clickButton(name: string) {
    await this.getButton(name).click();
  }

  getLink(name: string): Locator {
    return this.page.getByRole("link", { name });
  }

  async clickLink(name: string) {
    await this.getLink(name).click();
  }

  getTextField(label: string): Locator {
    return this.page.getByLabel(label);
  }

  async fillTextField(name: string, text: string) {
    await this.getTextField(name).fill(text);
  }

  async fillByTestId(testId: string, text: string) {
    await this.page.getByTestId(testId).fill(text);
  }

  getByTestId(testId: string): Locator {
    return this.page.getByTestId(testId);
  }

  async getTextByTestId(testId: string) {
    return await this.getByTestId(testId).textContent();
  }

  async getText(text: string) {
    return await this.page.getByText(text).textContent();
  }

  locator(selector: string): Locator {
    return this.page.locator(selector);
  }
}
