import { db } from "@/utils/dbConnection";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import LocalDate from "@/components/LocalDate";
import { ensureUserHasProfile } from "@/lib/guards";

export default async function TimeLinePage() {
  const { userId } = await auth();
  if (!userId) {
    return redirect("/sign-in");
  }

  await ensureUserHasProfile({ userId });

  const profile = await db.query("SELECT * FROM profiles WHERE id = $1", [
    userId,
  ]);
  if (!profile.rows.length) {
    return redirect("/create-profile");
  }

  async function getAllPosts() {
    try {
      const posts = await db.query(
        `SELECT social_posts.id, social_posts.content, social_posts.created_at, profiles.username, profiles.id AS profile_id
        FROM social_posts
        LEFT JOIN profiles ON social_posts.user_id = profiles.id
        ORDER BY social_posts.created_at DESC
        `
      );
      return posts.rows;
    } catch (error) {
      let message = "Unknown Error";
      if (error instanceof Error) message = error.message;
      console.error(message);
    }
  }

  const posts = (await getAllPosts()) || [];

  const postElements = posts.map((element) => {
    console.log(element);
    return (
      <div
        key={element.id}
        className="bg-[#1e1e2f] border border-[#22c55e] rounded-lg p-4 mb-8 flex flex-col"
      >
        <p className="text-[#22c55e] font-medium mb-2">
          {element.profile_id !== userId ? (
            <Link
              href={`/user/${element.profile_id}`}
              className="hover:underline hover:text-[#a7cfa3] transition-colors"
            >
              {element.username}
            </Link>
          ) : (
            element.username
          )}
        </p>
        <p className="text-[#d1fae5] mb-4">Message: {element.content}</p>
        <div className="flex flex-col gap-4 mt-2 sm:flex-row">
          <div className="text-sm text-[#a7cfa3] mb-2 sm:mb-0 self-center sm:ml-auto">
            <LocalDate dateString={element.created_at.toISOString()} />
          </div>
        </div>
      </div>
    );
  });

  return (
    <main className="text-[#d1fae5] p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Timeline</h1>
      <div>
        {postElements.length > 0 ? (
          postElements
        ) : (
          <div className="text-[#a7cfa3]">
            <p className="mb-2">There currently is no posts!</p>
            <p className="mb-2">Why not make a post</p>
            <Link
              href={"/posts/new"}
              className="p-4 mt-2 bg-[#2a2a3c] text-[#d1fae5] rounded-md hover:bg-[#3a3a56] border border-transparent hover:border-[#22c55e] transition-colors"
            >
              Make a post
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
