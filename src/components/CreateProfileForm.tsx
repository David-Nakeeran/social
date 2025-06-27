"use client";
import { createProfile } from "@/lib/actions";
import { UserIdProps } from "@/types/dataTypes";

export default function CreateProfileForm({ userId }: UserIdProps) {
  const createProfileWithId = createProfile.bind(null, userId);
  return (
    <form
      action={createProfileWithId}
      className="max-w-md mx-auto p-6 bg-[#121914] rounded-md shadow-md text-[#d1fae5]"
    >
      <fieldset className="flex flex-col gap-3">
        <legend className="text-2xl font-semibold mb-6 p-3">
          Create your profile
        </legend>
        <label htmlFor="username" className="mb-1 font-medium">
          Username:
        </label>
        <input
          name="username"
          type="text"
          placeholder="Enter your username"
          className="w-full p-3 rounded-md bg-[#1f2a20] border border-[#22c55e] text-[#d1fae5] mb-4"
          required
        ></input>
        <label htmlFor="bio" className="mb-1 font-medium">
          Bio:
        </label>
        <textarea
          name="bio"
          placeholder="Enter your bio"
          className="w-full p-3 rounded-md bg-[#1f2a20] border border-[#22c55e] text-[#d1fae5] mb-4"
          required
        />
        <button
          type="submit"
          className="w-full p-3 bg-[#22c55e] hover:bg-[#16a34a] rounded-md font-semibold text-[#0f0f0f] transition-colors"
        >
          Create Profile
        </button>
      </fieldset>
    </form>
  );
}
