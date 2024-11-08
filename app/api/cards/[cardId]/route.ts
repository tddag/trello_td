import { NextResponse } from "next/server";
import db from "@/lib/db";
import { auth } from "@clerk/nextjs/server";


export async function GET(
    req: Request,
    { params }: { params: { cardId: string}}
) {
    try {
        const { userId, orgId } = auth();

        if (!userId || !orgId) {
            return new NextResponse("Unauthorized", {
                status: 401
            })
        }

        const connection = await db();
        
        let q = `SELECT * FROM card WHERE id = ?`

        let [cards] = await connection.query(q, [params.cardId])

        let card = cards[0];
        if (card) {
            let q = `SELECT * FROM list WHERE id = ?`
            let [lists] = await connection.query(q, [card.listId])

            let list = lists[0];
            if (list) {
                card.list = list
            }
        }

        return NextResponse.json(card);



    } catch (error) {
        return new NextResponse("Internal Error", { status: 500});
    }
}