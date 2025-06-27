import { db } from "@/utils/dbConnection";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import LocalDate from "@/components/LocalDate";
import DeleteUserPostForm from "@/components/DeleteUserPostForm";

export default async function UserProfilePage() {
  const { userId } = await auth();
  if (!userId) {
    return redirect("/sign-in");
  }

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
      <main>
        <h1>User not found</h1>
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
      <div key={element.id}>
        <p>{element.content}</p>
        <LocalDate dateString={element.created_at.toISOString()} />
        <DeleteUserPostForm postId={postId} userId={userId} />
      </div>
    );
  });

  return (
    <main>
      <h1>Welcome {user.username}</h1>
      <p>{user.bio}</p>
      <div>
        {postElements.length > 0 ? (
          postElements
        ) : (
          <p>You haven&apos;t made any posts yet!</p>
        )}
      </div>
    </main>
  );
}
