"use server";

import { auth } from "@clerk/nextjs/server";
import { InputType, ReturnType } from "./types";
import db from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { CreateCard } from "./schema";
import { createAuditLog } from "@/lib/create-audit-log";
import { ACTION, ENTITY_TYPE } from "@/types/AuditLog";


const handler = async (data: InputType): Promise<ReturnType> => {

    const { userId, orgId } = auth();

    if (!userId || !orgId) {
        return {
            error: "Unauthorized",
        }
    }

    const { title, boardId, listId} = data;

    try {
        const connection = await db();

        let q = `SELECT * FROM list WHERE id = ?`
        let [lists] = await connection.query(q, [listId])

        if(!lists[0]) {
            return {
                error: "List not found"
            }
        }

        q = `SELECT \`order\` FROM card WHERE listId = ? ORDER BY \`order\` DESC`

        let [lastCard] = await connection.query(q, [listId])

        const newCardOrderNumber = lastCard[0] ? lastCard[0].order + 1 : 1;

        q = `INSERT INTO card (title, listId, \`order\`) VALUES (?, ?, ?)`

        await connection.query(q, [title, listId, newCardOrderNumber])  
        

        
        q = `SELECT * FROM card WHERE listId = ? ORDER BY \`order\` DESC`

        let [cards] = await connection.query(q, [listId])   

        const card = cards[0];

        await createAuditLog({
            entityId: card.id,
            entityTitle: card.title,
            entityType: ENTITY_TYPE.CARD,
            action: ACTION.CREATE,
        })        
        
        revalidatePath(`/board/${boardId}`)

        return {
            data: cards[0]
        }        

    } catch (e) {
        console.log(e)
        return {
            error: "Failed to create card"
        }
    }

   

}

export const createCard = createSafeAction(CreateCard, handler)