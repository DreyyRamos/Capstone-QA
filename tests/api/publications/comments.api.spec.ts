import { test, expect } from "../utils/apiFixtures";
import dotenv from "dotenv";
dotenv.config();

test.describe.serial("Publication comments API tests", () => {
  let pubId: string;
  let parentCommentId: string;
  let commentReplyId: string;
  let thirdLevelCommentId: string;
  let authorId: string;
  let replyAuthorId: string;

  test.beforeAll(async ({ studentApiContext }) => {
    const newPub = await studentApiContext.post("/api/publications/create", {
      data: {
        title: "This is test from playwright",
        excerpt: "This is test excerpt",
        content: "This is test content",
      },
    });
    expect(newPub.ok()).toBeTruthy();
    const pubData = await newPub.json();
    pubId = pubData.publication.pubId;
  });

  test.afterAll(async ({ studentApiContext }) => {
    const deletePub = await studentApiContext.delete(
      `/api/publications/${pubId}`,
    );
    expect(deletePub.status()).toBeTruthy();
  });

  test("Comment on a forum", async ({ studentApiContext }) => {
    const res = await studentApiContext.post(
      `/api/publications/${pubId}/comments`,
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
      `/api/publications/${pubId}/comments/${parentCommentId}`,
      {
        data: {
          reply_content: "This is a reply to a parent comment",
          commentId: parentCommentId,
          reply_authorId: authorId,
          pubId: pubId,
        },
      },
    );

    const commentData = await res.json();
    commentReplyId = commentData.replyId;
    replyAuthorId = commentData.reply_authorId;
    expect(res.status()).toBeTruthy();
  });

  test("Edit a comment on a publication", async ({ studentApiContext }) => {
    const res = await studentApiContext.put(
      `/api/publications/${pubId}/comments/${parentCommentId}/edit-comment`,
      {
        data: {
          comment_content: "Editing this reply parent comment",
        },
      },
    );
    expect(res.status()).toBe(200);
  });

  test("Reply to a reply on a forum", async ({ studentApiContext }) => {
    const res = await studentApiContext.post(
      `/api/publications/${pubId}/comments/${parentCommentId}/replies`,
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

  test("Edit a reply to reply on a publication", async ({
    studentApiContext,
  }) => {
    const res = await studentApiContext.put(
      `/api/publications/${pubId}/comments/${parentCommentId}/replies/${commentReplyId}/edit-comment`,
      {
        data: {
          reply_content: "Editing this reply parent comment",
        },
      },
    );
    expect(res.status()).toBe(200);
  });

  test("3rd level reply on a publication", async ({ studentApiContext }) => {
    const res = await studentApiContext.post(
      `/api/publications/${pubId}/comments/${parentCommentId}/replies/${commentReplyId}/children`,
      {
        data: {
          replyToReply_content: "This is a 3rd level reply to a child comment",
          parentReplyId: commentReplyId,
          reply_authorId: authorId,
        },
      },
    );

    const replyData = await res.json();
    thirdLevelCommentId = replyData.data.toComment.replyToReplyId;
    expect(res.status()).toBeTruthy();
  });

  test("Edit a 3rd level reply to a comment on a publication", async ({
    studentApiContext,
  }) => {
    const res = await studentApiContext.put(
      `/api/publications/${pubId}/comments/${parentCommentId}/replies/${commentReplyId}/children/${thirdLevelCommentId}/edit-comment`,
      {
        data: {
          replyToReply_content: "Editing this reply parent comment",
        },
      },
    );
    expect(res.status()).toBe(200);
  });
});
