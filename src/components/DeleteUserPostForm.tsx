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
        <button>Delete Post</button>
      </AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay />
        <AlertDialog.Content>
          <AlertDialog.Title>Confirm Post Deletion</AlertDialog.Title>
          <AlertDialog.Description>
            Are you sure you want to delete this post? This action cannot be
            undone.
          </AlertDialog.Description>
          {/* I had to wrap this alert in a div for it to work, as it messes up form submission */}
          <div>
            <AlertDialog.Cancel asChild>
              <button>Cancel</button>
            </AlertDialog.Cancel>
          </div>

          <form action={deleteUserPostWithId}>
            <button type="submit">Yes, delete post</button>
          </form>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}
