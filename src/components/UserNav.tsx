import Link from "next/link";

export default function UserNav() {
  return (
    <nav>
      <Link href={"/timeline"}>Timeline</Link>
      <Link href={"/user"}>Profile Page</Link>
      <Link href={"/posts/new"}>Make a post</Link>
    </nav>
  );
}
