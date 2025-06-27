import { db } from "@/utils/dbConnection";
import { redirect } from "next/navigation";
import { UserIdProps } from "@/types/dataTypes";

export async function ensureUserHasProfile({ userId }: UserIdProps) {
  const result = await db.query(`SELECT id FROM profiles WHERE id = $1`, [
    userId,
  ]);

  if (result.rows.length === 0) {
    redirect("/create-profile");
  }
}
