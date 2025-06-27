import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import CreateProfileForm from "@/components/CreateProfileForm";

export default async function CreateProfilePage() {
  const { userId } = await auth();

  if (!userId) {
    return redirect("/sign-in");
  }

  return (
    <main className="w-2/3">
      <CreateProfileForm userId={userId} />
    </main>
  );
}
