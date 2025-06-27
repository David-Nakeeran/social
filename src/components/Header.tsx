import HeaderNav from "./HeaderNav";
import UserNav from "./UserNav";
import { auth } from "@clerk/nextjs/server";

export default async function Header() {
  const { userId } = await auth();
  return (
    <header className="col-span-full row-start-1 row-end-2 w-full flex justify-between items-center mb-8">
      <h1>Social</h1>
      <div className="flex items-center justify-center gap-3">
        {userId ? <UserNav /> : null}
        <HeaderNav />
      </div>
    </header>
  );
}
