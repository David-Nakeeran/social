"use client";
import { deleteUserPost } from "@/lib/actions";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { PostIdProps, UserIdProps } from "@/types/dataTypes";

export default function DeleteUserPostForm({
  postId,
  userId,
}: PostIdProps & UserIdProps) {
  const deleteUserPostWithId = deleteUserPost.bind(null, postId, userId);
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger asChild>
        <button
          className="p-3 rounded-md bg-[#2a2a3c] text-[#d1fae5] hover:bg-[#3a3a56] 
                     border border-transparent hover:border-[#22c55e] transition-colors"
        >
          Delete Post
        </button>
      </AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm" />
        <AlertDialog.Content
          className="fixed top-1/2 left-1/2 max-h-[85vh] w-[90vw] max-w-[500px] -translate-x-1/2 -translate-y-1/2 
                     bg-[#121914] rounded-md p-6 shadow-lg text-[#d1fae5] border border-[#22c55e]"
        >
          <AlertDialog.Title className="text-lg font-semibold mb-2">
            Confirm Post Deletion
          </AlertDialog.Title>
          <AlertDialog.Description className="mb-6 text-sm text-[#a7cfa3]">
            Are you sure you want to delete this post? This action cannot be
            undone.
          </AlertDialog.Description>
          {/* I had to wrap this alert in a div for it to work, as it messes up form submission */}
          <div className="flex justify-end gap-4">
            <AlertDialog.Cancel asChild>
              <button
                className="p-3 rounded-md bg-[#2a2a3c] text-[#d1fae5] 
                           hover:bg-[#3a3a56] border border-transparent hover:border-[#22c55e]
                           transition-colors"
              >
                Cancel
              </button>
            </AlertDialog.Cancel>
            <form action={deleteUserPostWithId}>
              <button
                type="submit"
                className="p-3 rounded-md bg-[#dc2626] text-white font-semibold
                           hover:bg-[#b91c1c]"
              >
                Yes, delete post
              </button>
            </form>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}
