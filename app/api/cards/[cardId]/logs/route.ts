import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import db from "@/lib/db";
import { ENTITY_TYPE } from "@/types/AuditLog";

export async function GET (
    request: Request,
    { params }: { params: { cardId: string }}
) {
    try {

        const { userId, orgId } = auth();

        if (!userId || !orgId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const connection = await db();
        let q = `SELECT * FROM auditLog WHERE entityId = ? AND entityType = ? ORDER BY createdAt DESC LIMIT 3`
        let [auditLogs] = await connection.query(q, [params.cardId, ENTITY_TYPE.CARD])

        return NextResponse.json(auditLogs)
       
    } catch(error) {
        return new NextResponse("Internal Error", { status: 500});
    }
}