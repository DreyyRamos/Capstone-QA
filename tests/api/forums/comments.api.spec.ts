import { test, expect } from "../utils/apiFixtures";
import dotenv from "dotenv";
dotenv.config();

test.describe.serial("Forum comments API tests", () => {
  let forumId: string;
  let parentCommentId: string;
  let commentReplyId: string;
  let authorId: string;
  let replyAuthorId: string;

  test.beforeAll(async ({ studentApiContext }) => {
    const newForum = await studentApiContext.post("/api/forums/create", {
      data: {
        topicTitle: "Forum from API test for comments",
        description: "Forum from API test for comments",
      },
    });
    expect(newForum.ok()).toBeTruthy();
    const forumData = await newForum.json();
    forumId = forumData.forum.forumId;
  });

  test.afterAll(async ({ studentApiContext }) => {
    const deleteForum = await studentApiContext.delete(
      `/api/forums/${forumId}`,
    );
    expect(deleteForum.status()).toBeTruthy();
  });

  test("Comment on a forum", async ({ studentApiContext }) => {
    const res = await studentApiContext.post(
      `/api/forums/${forumId}/comments`,
      {
        data: {
          comment_content: "This is parent comment",
        },
      },
    );

    const commentData = await res.json();
    parentCommentId = commentData.data.toComment.commentId;
    authorId = commentData.data.toComment.authorId;
    expect(res.status()).toBe(200);
  });

  test("Reply to a parent comment on a forum", async ({
    studentApiContext,
  }) => {
    const res = await studentApiContext.post(
      `/api/forums/${forumId}/comments/${parentCommentId}`,
      {
        data: {
          reply_content: "This is a reply to a parent comment",
          commentId: parentCommentId,
          reply_authorId: authorId,
          forumId: forumId,
        },
      },
    );

    const commentData = await res.json();
    commentReplyId = commentData.replyId;
    replyAuthorId = commentData.reply_authorId;
    expect(res.status()).toBeTruthy();
  });

  test("Reply to a reply on a forum", async ({ studentApiContext }) => {
    const res = await studentApiContext.post(
      `/api/forums/${forumId}/comments/${parentCommentId}/replies`,
      {
        data: {
          reply_content: "This is a reply to a child comment",
          commentId: commentReplyId,
          reply_authorId: authorId,
        },
      },
    );
    expect(res.status()).toBeTruthy();
  });
});
