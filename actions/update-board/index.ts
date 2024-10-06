"use server";

import { auth } from "@clerk/nextjs/server";
import { InputType, ReturnType } from "./types";
import db from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { UpdateBoard } from "./schema";


const handler = async (data: InputType): Promise<ReturnType> => {

    console.log("start updating")
    const { userId, orgId } = auth();

    if (!userId || !orgId) {
        return {
            error: "Unauthorized",
        }
    }

    const { title, id } = data;

    try {
         
    } catch (e) {
        console.log(e)
        return {
            error: "Failed to update."
        }
    }

    const connection = await db();

    let q = `UPDATE board SET title = ? WHERE id = ? AND orgId = ?`

    await connection.query(q, [title, id, orgId])

    q = `SELECT * FROM board WHERE id = ?`
    let [boards] = await connection.query(q, [id])

    // console.log(boards[0]);

    revalidatePath(`/board/${id}`)

    return {
        data: boards[0]
    }
}

export const updateBoard = createSafeAction(UpdateBoard, handler)