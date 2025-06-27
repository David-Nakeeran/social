import PostForm from "@/components/PostForm";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { ensureUserHasProfile } from "@/lib/guards";

export default async function PostNewPage() {
  const { userId } = await auth();

  if (!userId) {
    return redirect("/sign-in");
  }
  await ensureUserHasProfile({ userId });
  return (
    <main>
      <h1>Make a new social post</h1>
      <PostForm userId={userId} />
    </main>
  );
}
