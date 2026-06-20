export default class CommonActions {
  page: any;

  constructor(page: any) {
    this.page = page;
  }

  async navigate(url: string) {
    await this.page.pause();
    await this.page.goto(url);
  }

  async click(selector: string) {
    await this.page.click(selector);
  }

  async fill(selector: string, text: string) {
    await this.page.fill(selector, text);
  }

  async getText(selector: string) {
    return await this.page.textContent(selector);
  }
}
