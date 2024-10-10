"use server";

import { auth } from "@clerk/nextjs/server";
import { InputType, ReturnType } from "./types";
import db from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { UpdateList } from "./schema";


const handler = async (data: InputType): Promise<ReturnType> => {

    console.log("start updating")
    const { userId, orgId } = auth();

    if (!userId || !orgId) {
        return {
            error: "Unauthorized",
        }
    }

    const { title, id, boardId } = data;

    const connection = await db();

    let q = `UPDATE list SET title = ? WHERE id = ? AND boardId = ?`

    await connection.query(q, [title, id, boardId])

    q = `SELECT * FROM list WHERE id = ?`
    let [lists] = await connection.query(q, [id])

    console.log("updated list is: ")
    console.log(lists[0]);

    revalidatePath(`/board/${boardId}`)

    return {
        data: lists[0]
    }
}

export const updateList= createSafeAction(UpdateList, handler)