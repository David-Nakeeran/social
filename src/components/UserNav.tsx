import Link from "next/link";

export default function UserNav() {
  return (
    <nav>
      <Link href={"/user"}>Profile Page</Link>
    </nav>
  );
}
