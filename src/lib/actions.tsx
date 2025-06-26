"use server";
import { db } from "@/utils/dbConnection";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createProfile(id: string, formData: FormData) {
  const profileData = {
    username: formData.get("username"),
    bio: formData.get("bio"),
  };

  await db.query(
    `INSERT INTO profiles (id, username, bio) VALUES($1, $2, $3)`,
    [id, profileData.username, profileData.bio]
  );
  // added revalidate and redirect
}

export async function createPost(id: string, formData: FormData) {
  const postData = {
    content: formData.get("content"),
  };

  await db.query(`INSERT INTO social_posts (user_id, content) VALUES($1, $2)`, [
    id,
    postData.content,
  ]);

  revalidatePath("/user");
  redirect("/user");
}
