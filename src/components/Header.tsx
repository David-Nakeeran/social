import HeaderNav from "./HeaderNav";
import UserNav from "./UserNav";
import { auth } from "@clerk/nextjs/server";

export default async function Header() {
  const { userId } = await auth();
  return (
    <header>
      <h1>Social</h1>
      <HeaderNav />
      {userId ? <UserNav /> : null}
    </header>
  );
}
