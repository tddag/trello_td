"use server";

import { auth } from "@clerk/nextjs/server";
import { InputType, ReturnType } from "./types";
import db from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { CreateList } from "./schema";


const handler = async (data: InputType): Promise<ReturnType> => {

    const { userId, orgId } = auth();

    if (!userId || !orgId) {
        return {
            error: "Unauthorized",
        }
    }

    const { title, boardId } = data;

    const connection = await db();

    let q = `SELECT * FROM board WHERE id = ? AND orgId = ?`

    const [boards] = await connection.query(q, [boardId, orgId])

    if (!boards[0]) {
        return {
            error: "Board not found",
        }
    }

    q = `SELECT \`order\` FROM list WHERE boardId = ? ORDER BY \`order\` DESC`
    let [lists] = await connection.query(q, [boardId])

    console.log(lists)
    const newOrder = lists[0] ? lists[0].order + 1 : 1;

    try {
        q = `INSERT INTO list (title, boardId, \`order\`) VALUES (?, ?, ?)`

        await connection.query(q, [title, boardId, newOrder])
    
    } catch (e) {
        console.log(e)
    }


    q = `SELECT * FROM list WHERE boardId = ?`;
    [lists] = await connection.query(q, [boardId])

    // console.log(boards[0]);

    console.log("path is: ")
    console.log(`/board/${boardId}`)

    revalidatePath(`/board/${boardId}`)

    return {
        data: lists[lists.length - 1]
    }
}

export const createList = createSafeAction(CreateList, handler)