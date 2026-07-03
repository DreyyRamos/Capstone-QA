import { Page } from "@playwright/test";
import Homepage from "./Homepage";
import LoginPage from "./LoginPage";
import PublicationsPage from "./PublicationsPage";
import UsersPage from "./UsersPage";

export default class PageManager {
  page: Page;
  homepage: Homepage;
  loginpage: LoginPage;
  publicationsPage: PublicationsPage;
  usersPage: UsersPage;
  constructor(page: Page) {
    this.page = page;
    this.homepage = new Homepage(page);
    this.loginpage = new LoginPage(page);
    this.publicationsPage = new PublicationsPage(page);
    this.usersPage = new UsersPage(page);
  }
}
