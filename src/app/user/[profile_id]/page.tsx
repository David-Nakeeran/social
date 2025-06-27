import { db } from "@/utils/dbConnection";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { ensureUserHasProfile } from "@/lib/guards";
import { ParamsProfileId } from "@/types/dataTypes";

export default async function UsernameProfilePage({ params }: ParamsProfileId) {
  const { userId } = await auth();
  if (!userId) {
    return redirect("/sign-in");
  }

  await ensureUserHasProfile({ userId });

  const { profile_id } = await params;

  async function getUser() {
    try {
      const user = await db.query(`SELECT * FROM profiles WHERE id = $1`, [
        profile_id,
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

  return (
    <main>
      <h1>You are viewing {user.username} profile page</h1>
      <p>{user.bio}</p>
    </main>
  );
}
