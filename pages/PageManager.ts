import { Page } from "@playwright/test";
import Homepage from "./Homepage";
import LoginPage from "./LoginPage";
import PublicationsPage from "./PublicationsPage";
import UsersPage from "./UsersPage";
import RegistrationPage from "./RegistrationPage";
import AdmissionsPage from "./AdmissionsPage";
import ForumPage from "./ForumPage";
import ModerationPage from "./ModerationPage";
import ContentManagerPage from "./ContentManagerPage";
import RoleChangeRequestPage from "./RoleChangeRequestPage";

export default class PageManager {
  page: Page;
  homepage: Homepage;
  loginpage: LoginPage;
  publicationsPage: PublicationsPage;
  usersPage: UsersPage;
  registrationPage: RegistrationPage;
  admissionsPage: AdmissionsPage;
  forumPage: ForumPage;
  moderationPage: ModerationPage;
  contentManagerPage: ContentManagerPage;
  roleChangeRequestPage: RoleChangeRequestPage;
  constructor(page: Page) {
    this.page = page;
    this.homepage = new Homepage(page);
    this.loginpage = new LoginPage(page);
    this.publicationsPage = new PublicationsPage(page);
    this.usersPage = new UsersPage(page);
    this.registrationPage = new RegistrationPage(page);
    this.admissionsPage = new AdmissionsPage(page);
    this.forumPage = new ForumPage(page);
    this.moderationPage = new ModerationPage(page);
    this.contentManagerPage = new ContentManagerPage(page);
    this.roleChangeRequestPage = new RoleChangeRequestPage(page);
  }
}
