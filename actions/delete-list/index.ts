"use server";

import { auth } from "@clerk/nextjs/server";
import { InputType, ReturnType } from "./types";
import db from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { DeleteList } from "./schema";
import { redirect } from "next/navigation";
import List from "@/types/List";


const handler = async (data: InputType): Promise<ReturnType> => {

    console.log("start deleting")
    const { userId, orgId } = auth();

    if (!userId || !orgId) {
        return {
            error: "Unauthorized",
        }
    }

    const { id, boardId } = data;

    let list: List;
    try {
        const connection = await db();
        let q = `SELECT * FROM list WHERE id = ? AND boardId = ?`
        const [lists] = await connection.query(q, [id, boardId])
        list = lists[0];
    } catch (e) {
        console.log(e)
        return {
            error: "List not found!"
        }
    }

    try {
        const connection = await db();

        let q = `DELETE FROM list WHERE id = ? AND boardId = ?`
        await connection.query(q, [id, boardId])

    } catch (e) {
        return {
            error: "Failed to Delete"
        }
    }


    revalidatePath(`/board/${boardId}`);
    return {
        data: list
    }

}

export const deleteList = createSafeAction(DeleteList, handler)