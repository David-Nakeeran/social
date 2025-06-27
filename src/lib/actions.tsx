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
  revalidatePath("/user");
  redirect("/user");
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

export async function deleteUserPost(postId: number, userId: string) {
  await db.query(`DELETE FROM social_posts WHERE id = $1 AND user_id = $2`, [
    postId,
    userId,
  ]);
  revalidatePath("/user");
}
