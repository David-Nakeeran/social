"use client";
import { createPost } from "@/lib/actions";
import { UserIdProps } from "@/types/dataTypes";

export default function CreatePostForm({ userId }: UserIdProps) {
  const createPostWithId = createPost.bind(null, userId);
  return (
    <form action={createPostWithId}>
      <fieldset>
        <legend>Create a Social Post</legend>
        <label htmlFor="content">Content:</label>
        <textarea name="content" placeholder="Enter your post" required />
        <button type="submit">Create Post</button>
      </fieldset>
    </form>
  );
}
