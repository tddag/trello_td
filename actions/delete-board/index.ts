"use server";

import { auth } from "@clerk/nextjs/server";
import { InputType, ReturnType } from "./types";
import db from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { DeleteBoard } from "./schema";
import { redirect } from "next/navigation";


const handler = async (data: InputType): Promise<ReturnType> => {

    console.log("start deleting")
    const { userId, orgId } = auth();

    if (!userId || !orgId) {
        return {
            error: "Unauthorized",
        }
    }

    const { id } = data;

    const connection = await db();

    let q = `DELETE FROM board WHERE id = ? AND orgId = ?`

    await connection.query(q, [id, orgId])

    revalidatePath(`/organization/${orgId}`)
    redirect(`/organization/${orgId}`);

}

export const deleteBoard = createSafeAction(DeleteBoard, handler)