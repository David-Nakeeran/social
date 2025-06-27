import { db } from "@/utils/dbConnection";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import LocalDate from "@/components/LocalDate";
import DeleteUserPostForm from "@/components/DeleteUserPostForm";
import { ensureUserHasProfile } from "@/lib/guards";
import Link from "next/link";

export default async function UserProfilePage() {
  const { userId } = await auth();
  if (!userId) {
    return redirect("/sign-in");
  }

  await ensureUserHasProfile({ userId });

  async function getUser() {
    try {
      const user = await db.query(`SELECT * FROM profiles WHERE id = $1`, [
        userId,
      ]);
      return user.rows[0];
    } catch (error) {
      let message = "Unknown Error";
      if (error instanceof Error) message = error.message;
      console.error(message);
    }
  }

  const user = (await getUser()) || [];

  if (user.length === 0) {
    return (
      <main className="text-[#d1fae5] p-6">
        <h1 className="text-2xl font-bold text-red-500">User not found</h1>
      </main>
    );
  }

  async function getPosts() {
    try {
      const posts = await db.query(
        `SELECT * FROM social_posts WHERE user_id = $1
        Order BY created_at DESC
        `,
        [userId]
      );
      return posts.rows;
    } catch (error) {
      let message = "Unknown Error";
      if (error instanceof Error) message = error.message;
      console.error(message);
    }
  }

  const posts = (await getPosts()) || [];

  const postElements = posts.map((element) => {
    const postId = parseInt(element.id);
    return (
      <div
        key={element.id}
        className="bg-[#1e1e2f] border border-[#22c55e] rounded-lg p-4 mb-8 flex flex-col"
      >
        <p className="text-[#d1fae5]">{element.content}</p>
        <div className="flex flex-col gap-4 mt-2 sm:flex-row">
          <DeleteUserPostForm postId={postId} userId={userId} />
          <Link
            href={`/posts/${element.id}/edit`}
            className="text-center p-3 rounded-md bg-[#2a2a3c] text-[#d1fae5] hover:bg-[#3a3a56] 
                     border border-transparent hover:border-[#22c55e] transition-colors"
          >
            Edit post
          </Link>
          <div className="text-sm text-[#a7cfa3] mb-2 self-center sm:ml-auto">
            <LocalDate dateString={element.created_at.toISOString()} />
          </div>
        </div>
      </div>
    );
  });

  return (
    <main className="text-[#d1fae5] p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">Welcome {user.username}</h1>
      <p className="mb-10 text-[#a7cfa3]">Your bio: {user.bio}</p>
      <p className="text-2xl font-semibold mb-2">Your Posts</p>
      <div>
        {postElements.length > 0 ? (
          postElements
        ) : (
          <p className="text-[#a7cfa3]">You haven&apos;t made any posts yet!</p>
        )}
      </div>
    </main>
  );
}
