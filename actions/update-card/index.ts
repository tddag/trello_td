"use server";

import { auth } from "@clerk/nextjs/server";
import { InputType, ReturnType } from "./types";
import db from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { UpdateCard } from "./schema";


const handler = async (data: InputType): Promise<ReturnType> => {

    console.log("start updating")
    const { userId, orgId } = auth();

    if (!userId || !orgId) {
        return {
            error: "Unauthorized",
        }
    }

    const { id, boardId, title, description } = data;

    try {
        
        const connection = await db();
        // console.log("...values are: ", JSON.stringify(values))

        let q = `UPDATE card SET title = ?, description = ?  WHERE id = ?`

        await connection.query(q, [title, description, id])

        q = `SELECT * FROM card WHERE id = ?`
        let [cards] = await connection.query(q, [id])

        console.log("Card is: ", cards[0])

        revalidatePath(`/board/${boardId}`)        
        return {
            data: cards[0]
        }
    } catch(e) {
        return {
            error: "Failed to update."
        }
    }

    

}

export const updateCard = createSafeAction(UpdateCard, handler)