import { db } from "@/utils/dbConnection";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function TimeLinePage() {
  const { userId } = await auth();
  if (!userId) {
    return redirect("/sign-in");
  }

  async function getAllPosts() {
    try {
      const posts = await db.query(
        `SELECT social_posts.content, social_posts.created_at, profiles.username
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
    console.log(element.username);
    return (
      <div key={element.id}>
        <p>{element.username}</p>
        <p>{element.content}</p>
        <p>{new Date(element.created_at).toLocaleString("en-GB")}</p>
      </div>
    );
  });

  return (
    <>
      <h1>Timeline</h1>
      <div>
        {postElements.length > 0 ? (
          postElements
        ) : (
          <>
            <p>There currently is no posts!</p>
            <p>Why not make a post</p>
            <Link href={"/posts/new"}>Make a post</Link>
          </>
        )}
      </div>
    </>
  );
}
