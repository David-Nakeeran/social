import ActiveLink from "@/components/ActiveLink";

export default function UserNav() {
  return (
    <nav className="flex gap-3">
      <ActiveLink href="/timeline">Timeline</ActiveLink>
      <ActiveLink href="/user">Profile Page</ActiveLink>
      <ActiveLink href="/posts/new">Make a post</ActiveLink>
    </nav>
  );
}
