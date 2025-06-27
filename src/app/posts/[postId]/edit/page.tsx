import { db } from "@/utils/dbConnection";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { ensureUserHasProfile } from "@/lib/guards";
import { ParamsPostId } from "@/types/dataTypes";
import PostUpdateForm from "@/components/PostUpdateForm";

export default async function EditUserPostPage({ params }: ParamsPostId) {
  const { userId } = await auth();
  if (!userId) {
    return redirect("/sign-in");
  }

  await ensureUserHasProfile({ userId });

  const { postId } = await params;

  async function getPost() {
    try {
      const post = await db.query(
        `SELECT * FROM social_posts
        WHERE id = $1
        `,
        [postId]
      );
      return post.rows[0];
    } catch (error) {
      let message = "Unknown Error";
      if (error instanceof Error) message = error.message;
      console.error(message);
    }
  }

  const post = (await getPost()) || [];

  return (
    <main className="w-2/3">
      <PostUpdateForm post={post} />
    </main>
  );
}
