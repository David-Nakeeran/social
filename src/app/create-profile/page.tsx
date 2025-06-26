import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import CreateProfileForm from "@/components/CreateProfileForm";

export default async function CreateProfilePage() {
  const { userId } = await auth();
  //   const user = await currentUser();
  //   console.log(userId);
  //   console.log(user);
  if (!userId) {
    return redirect("/sign-in");
  }
  return (
    <>
      <h1>Create profile, protected...I hope</h1>
      <CreateProfileForm userId={userId} />
    </>
  );
}
