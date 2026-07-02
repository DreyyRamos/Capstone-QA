import { Page } from "@playwright/test";
import Homepage from "./Homepage";
import LoginPage from "./LoginPage";
import PublicationsPage from "./PublicationsPage";

export default class PageManager {
  page: Page;
  homepage: Homepage;
  loginpage: LoginPage;
  publicationsPage: PublicationsPage;
  constructor(page: Page) {
    this.page = page;
    this.homepage = new Homepage(page);
    this.loginpage = new LoginPage(page);
    this.publicationsPage = new PublicationsPage(page);
  }
}
