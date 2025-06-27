"use client";
import { updatePost } from "@/lib/actions";
import { PostProps } from "@/types/dataTypes";

export default function PostUpdateForm({ post }: PostProps) {
  const updatePostWithId = updatePost.bind(null, post.id);
  return (
    <form
      action={updatePostWithId}
      className="max-w-md mx-auto p-6 bg-[#121914] rounded-md shadow-md text-[#d1fae5]"
    >
      <fieldset className="flex flex-col gap-3">
        <legend className="text-2xl font-semibold mb-6 p-3">
          Update your post
        </legend>
        <label htmlFor="content" className="mb-1 font-medium">
          Content:
        </label>
        <textarea
          name="content"
          placeholder="Enter your content"
          defaultValue={post.content}
          className="w-full p-3 rounded-md bg-[#1f2a20] border border-[#22c55e] text-[#d1fae5] mb-4"
          required
        />
        <button
          type="submit"
          className="w-full p-3 bg-[#22c55e] hover:bg-[#16a34a] rounded-md font-semibold text-[#0f0f0f] transition-colors"
        >
          Update post
        </button>
      </fieldset>
    </form>
  );
}
