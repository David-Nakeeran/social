"use client";
import { createProfile } from "@/lib/actions";
import { UserIdProps } from "@/types/dataTypes";

export default function CreateProfileForm({ userId }: UserIdProps) {
  const createProfileWithId = createProfile.bind(null, userId);
  return (
    <form action={createProfileWithId}>
      <fieldset>
        <legend>Create your profile</legend>
        <label htmlFor="username">Username:</label>
        <input
          name="username"
          type="text"
          placeholder="Enter your username"
          required
        ></input>
        <label htmlFor="bio">Bio:</label>
        <textarea name="bio" placeholder="Enter your bio" required />
        <button type="submit">Create Profile</button>
      </fieldset>
    </form>
  );
}
