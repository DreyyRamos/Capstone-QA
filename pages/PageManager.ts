import Homepage from "./Homepage";
import LoginPage from "./LoginPage";

export default class PageManager {
  page: any;
  homepage: any;
  loginpage: any;
  constructor(page: any) {
    this.page = page;
    this.homepage = new Homepage(page);
    this.loginpage = new LoginPage(page);
  }
}
