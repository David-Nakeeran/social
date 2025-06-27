"use client";
import { updatePost } from "@/lib/actions";
import { PostProps } from "@/types/dataTypes";

export default function PostUpdateForm({ post }: PostProps) {
  const updatePostWithId = updatePost.bind(null, post.id);
  return (
    <form action={updatePostWithId}>
      <fieldset>
        <legend>Update your post</legend>
        <label htmlFor="content">Content:</label>
        <textarea
          name="content"
          placeholder="Enter your content"
          defaultValue={post.content}
          required
        />
        <button type="submit">Update post</button>
      </fieldset>
    </form>
  );
}
