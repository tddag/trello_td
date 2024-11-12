"use server";

import { auth } from "@clerk/nextjs/server";
import { InputType, ReturnType } from "./types";
import db from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { DeleteCard } from "./schema";
import { redirect } from "next/navigation";
import List from "@/types/List";
import Card from "@/types/Card";


const handler = async (data: InputType): Promise<ReturnType> => {

    console.log("start deleting card")
    const { userId, orgId } = auth();

    if (!userId || !orgId) {
        return {
            error: "Unauthorized",
        }
    }

    const { id, boardId } = data;


    try {
        const connection = await db();

        let q = `SELECT * FROM card WHERE id = ?`
        let [cards] = await connection.query(q, [id])
       
        
        if (!cards[0]) {
            return {
                error: "Card not found"
            }
        }

        const card = cards[0];

        q = `DELETE FROM card WHERE id = ?`;
        await connection.query(q, [id])
        
        revalidatePath(`/board/${boardId}`);
        return {
            data: card
        }


    } catch (e) {
        return {
            error: "Failed to delete card"
        }
    }

}

export const deleteCard = createSafeAction(DeleteCard, handler)