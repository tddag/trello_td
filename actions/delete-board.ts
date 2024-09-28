"use server";
import { revalidatePath } from "next/cache";
import db from "@/lib/db";

export async function deleteBoard(id: string) {
    console.log("Deleting Board", id);
    const connection = await db();
    await connection.query(`DELETE FROM board WHERE id = ?`, [id])

    revalidatePath("/organization/org_2lzEBlBqmiTJHsMWN3c0XAETWrA");

}