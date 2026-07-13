import { expect, Locator, Page } from "@playwright/test";
import BasePage from "./BasePage";

export enum CategoryOption {
  GeneralDiscussion = "General Discussion",
  Academic = "Academic",
  ClubsAndActivities = "Clubs & Activities",
  Sports = "Sports",
  ArtsAndCulture = "Arts & Culture",
  Technology = "Technology",
  StudyGroup = "Study Group",
  Events = "Events",
  HelpAndSupport = "Help & Support",
}

export default class ForumPage extends BasePage {
  readonly createForumBtn: Locator;
  readonly titleTxtbox: Locator;
  readonly content: Locator;
  readonly category: Locator;
  readonly tagsTxtBox: Locator;
  readonly addTagsBtn: Locator;
  readonly submitForumBtn: Locator;

  constructor(page: Page) {
    super(page);
    this.createForumBtn = page.getByTestId("page-a-1");
    this.titleTxtbox = page.getByRole("textbox", { name: "Topic Title *" });
    this.content = page.locator(".tiptap");
    this.category = page.getByRole("combobox");
    this.tagsTxtBox = page.getByRole("textbox", { name: "Add tag..." });
    this.addTagsBtn = page.getByTestId("page-button-1");
    this.submitForumBtn = page.getByTestId("page-button-3");
  }

  async goto() {
    await this.navigate("/forum");
  }

  async gotoCreateForum() {
    await this.navigate("/forum/create");
  }

  getCategoryOption(opt: CategoryOption): Locator {
    return this.page.getByRole("option", { name: opt });
  }

  async createForum(
    opt: CategoryOption,
    title: string,
    content: string,
    tags: string,
  ) {
    await this.gotoCreateForum();
    await this.titleTxtbox.fill(title);
    await this.content.fill(content);
    await this.category.click();
    await this.getCategoryOption(opt).click();
    await this.tagsTxtBox.fill(tags);
    await this.addTagsBtn.click();
    await this.submitForumBtn.click();

    await this.page.waitForURL(/\/forum\/topic\/[a-z0-9]+/);

    const url = this.page.url();
    const forumId = url.split("/").pop()!;

    return forumId;
  }

  async assertForumCreatedMessage() {
    await expect(this.page.locator("[data-sonner-toast]")).toContainText(
      "Forum created!",
    );
  }

  async clickCreateButton() {
    await this.createForumBtn.click();
  }

  async assertNoAccountMessage() {
    await this.noAccountMessage();
    await this.noAccountModalClose();
  }

  async gotoEditForum(forumId: string) {
    await this.navigate(`/profile/forums/${forumId}/update`);
  }

  async fillForumToEdit(title: string, content: string) {
    await this.page.getByRole("textbox", { name: "Topic Title *" }).fill(title);
    await this.page.getByRole("textbox", { name: "Description" }).fill(content);
  }

  async submitEditedForum() {
    await this.page.getByTestId("page-button-3").click();
  }

  async assertUpdatedForum() {
    await expect(this.page.locator("[data-sonner-toast]")).toContainText(
      "Forum updated successfully!",
    );
  }
}
