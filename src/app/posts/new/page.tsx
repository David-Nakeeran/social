import PostForm from "@/components/PostForm";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function PostNewPage() {
  const { userId } = await auth();
  //   const user = await currentUser();
  //   console.log(userId);
  //   console.log(user);
  if (!userId) {
    return redirect("/sign-in");
  }
  return (
    <main>
      <h1>Make a new social post</h1>
      <PostForm userId={userId} />
    </main>
  );
}
