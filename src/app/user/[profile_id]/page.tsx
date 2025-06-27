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
      <main className="text-[#d1fae5] p-6">
        <h1 className="text-2xl font-bold text-red-500">User not found</h1>
      </main>
    );
  }

  return (
    <main className="text-[#d1fae5] p-6 max-w-2xl mx-auto">
      <div className="bg-[#1e1e2f] border border-[#22c55e] rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-4">
          <p>{user.username} profile page</p>
        </h1>
        <p className="text-[#a7cfa3] whitespace-pre-line">Bio: {user.bio}</p>
      </div>
    </main>
  );
}
