"use server";

import { auth } from "@clerk/nextjs/server";
import { InputType, ReturnType } from "./types";
import db from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { CopyList } from "./schema";
import { redirect } from "next/navigation";
import List from "@/types/List";
import Card from "@/types/Card";
import { createAuditLog } from "@/lib/create-audit-log";
import { ACTION, ENTITY_TYPE } from "@/types/AuditLog";


const handler = async (data: InputType): Promise<ReturnType> => {

    console.log("start deleting")
    const { userId, orgId } = auth();

    if (!userId || !orgId) {
        return {
            error: "Unauthorized",
        }
    }

    const { id, boardId } = data;

    let listToCopy: List;
    try {
        const connection = await db();
        let q = `SELECT * FROM list WHERE id = ? AND boardId = ?`
        const [lists] = await connection.query(q, [id, boardId])
        listToCopy = lists[0];
    } catch (e) {
        console.log(e)
        return {
            error: "Failed finding list!"
        }
    }

    if (!listToCopy) return {
        error: "List not found"
    }

    let lastList: List;

    try {
        const connection = await db();
        let q = `SELECT \`order\` FROM list WHERE boardId = ? ORDER BY \`order\` DESC`
        const [lists] = await connection.query(q, [boardId])
        lastList = lists[0];
    } catch (e) {
        return {
            error: "Failed getting last list in the board"
        }
    }

    const newOrderNumber = lastList ? lastList.order + 1 : 1

    let newList: List;
    try {
        const connection = await db();

        let q = `INSERT INTO list (boardId, title, \`order\`) VALUES (?, ?, ?)`
        const [res] = await connection.query(q, [boardId, listToCopy.title + " - Copy", newOrderNumber])
        console.log("Creating new list: ")
        console.log(res)

        q = `SELECT * FROM list WHERE \`order\` = ? AND boardId = ?`
        const [lists] = await connection.query(q, [newOrderNumber, boardId])
        newList = lists[0];

        await createAuditLog({
            entityId: newList.id,
            entityTitle: newList.title,
            entityType: ENTITY_TYPE.LIST,
            action: ACTION.CREATE
        })        

    } catch (e) {
        return {
            error: "Failed to create a new list"
        }
    }

    let newCopyCards: Card[] = []

    try {
        const connection = await db();

        let q = `SELECT * FROM card WHERE listId = ?`
        const [cards] = await connection.query(q, [listToCopy.id])

        for (let card of cards) {
            let q = `INSERT INTO card (title, \`order\`, description, listId) VALUES (?, ?, ?, ?)`
            const [res] = await connection.query(q, [card.title, card.order, card.description, newList.id]) 

            q = `SELECT * FROM card WHERE listId = ? ORDER BY id`
            const [foundCards] = await connection.query(q, [newList.id]) 
            let newCard = foundCards[0];

            await createAuditLog({
                entityId: newCard.id,
                entityTitle: newCard.title,
                entityType: ENTITY_TYPE.CARD,
                action: ACTION.CREATE
            })              
            newCopyCards.push(newCard)
            console.log("new card created")
            console.log(newCard)
        }
    } catch (e) {
        return {
            error: "Failed to copy cards to new List"
        }
    }
    newList.cards = newCopyCards;

    revalidatePath(`/board/${boardId}`);
    return {
        data: newList
    }

}

export const copyList = createSafeAction(CopyList, handler)