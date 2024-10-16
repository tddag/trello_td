"use server";

import { auth } from "@clerk/nextjs/server";
import { InputType, ReturnType } from "./types";
import db from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { UpdateCardOrder } from "./schema";


const handler = async (data: InputType): Promise<ReturnType> => {

    const { userId, orgId } = auth();

    if (!userId || !orgId) {
        return {
            error: "Unauthorized",
        }
    }

    const { items, boardId } = data;

    try {

        const connection = await db();

        items.forEach(async (item) => {
            let q = `UPDATE card SET \`order\` = ?, listId = ? WHERE id = ?`
            await connection.query(q, [item.order, item.listId, item.id])
        })


        revalidatePath(`/board/${boardId}`)

        return {
            data: items
        }

    } catch (e) {
        console.log(e);
        return {
            error: "Failed to update card order"
        }
    }

   


}

export const updateCardOrder = createSafeAction(UpdateCardOrder, handler)