import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

export default function HeaderNav() {
  return (
    <nav className="flex items-center justify-center">
      <SignedIn>
        <UserButton />
      </SignedIn>
      <SignedOut>
        <div className="flex gap-4">
          <SignInButton mode="modal" />
          <SignUpButton mode="modal" />
        </div>
      </SignedOut>
    </nav>
  );
}
