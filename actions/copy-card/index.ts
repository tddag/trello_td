"use server";

import { auth } from "@clerk/nextjs/server";
import { InputType, ReturnType } from "./types";
import db from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { CopyCard } from "./schema";
import { redirect } from "next/navigation";
import List from "@/types/List";
import Card from "@/types/Card";


const handler = async (data: InputType): Promise<ReturnType> => {

    console.log("start copying card")
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

        q = `SELECT * FROM card WHERE listId = ? ORDER BY \`order\` desc`;
        [cards] = await connection.query(q, [card.listId])

        let lastCardInList = cards[0];
        let newOrder = lastCardInList ? lastCardInList.order + 1 : 1;

        // console.log("Last Card in LIst is: ")
        // console.log(lastCardInList)        

        q = `INSERT INTO card(title, description, \`order\`, listId) VALUES(?, ?, ?, ?)`
        let [res] = await connection.query(q, [card.title, card.description, card.order, card.listId]);
        console.log("Copy card res: ")
        console.log(res);

        q = `SELECT * FROM card WHERE listId = ? ORDER BY \`order\` desc`;
        [cards] = await connection.query(q, [card.listId])

        let newCard = cards[0];

        // console.log("New copied card is: ")
        // console.log(newCard)

        revalidatePath(`/board/${boardId}`);
        return {
            data: newCard
        }


    } catch (e) {
        return {
            error: "Failed to copy card to new List"
        }
    }

}

export const copyCard = createSafeAction(CopyCard, handler)