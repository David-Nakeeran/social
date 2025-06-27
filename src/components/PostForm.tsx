"use client";
import { createPost } from "@/lib/actions";
import { UserIdProps } from "@/types/dataTypes";

export default function CreatePostForm({ userId }: UserIdProps) {
  const createPostWithId = createPost.bind(null, userId);
  return (
    <form
      action={createPostWithId}
      className="max-w-md mx-auto p-6 bg-[#121914] rounded-md shadow-md text-[#d1fae5]"
    >
      <fieldset className="flex flex-col gap-3">
        <legend className="text-2xl font-semibold mb-6 p-3">
          Create a Social Post
        </legend>
        <label htmlFor="content" className="mb-1 font-medium">
          Content:
        </label>
        <textarea
          name="content"
          placeholder="Enter your post"
          className="w-full p-3 rounded-md bg-[#1f2a20] border border-[#22c55e] text-[#d1fae5] mb-4"
          required
        />
        <button
          type="submit"
          className="w-full p-3 bg-[#22c55e] hover:bg-[#16a34a] rounded-md font-semibold text-[#0f0f0f] transition-colors"
        >
          Create Post
        </button>
      </fieldset>
    </form>
  );
}
