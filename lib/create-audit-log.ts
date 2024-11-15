import { ACTION, ENTITY_TYPE } from "@/types/AuditLog";
import { auth, currentUser } from "@clerk/nextjs/server";
import db from "@/lib/db";


interface Props {
    entityId: string;
    entityType: ENTITY_TYPE,
    entityTitle: string,
    action: ACTION
}

export const createAuditLog = async (props: Props) => {
    try {
        const { orgId } = auth();
        const user = await currentUser();

        if (!user || !orgId) {
            throw new Error("User not found!");
        }

        const { entityId, entityType, entityTitle, action } = props;
        const connection = await db();
        let q = `INSERT INTO auditLog (orgId, entityId, entityType, entityTitle, action, userId, userImage, userName) VALUES(?, ?, ?, ?, ?, ?, ?, ?)`

        await connection.query(q, [orgId, entityId, entityType, entityTitle, action, user.id, user?.imageUrl, user?.firstName])


    } catch (error) {
        console.log("[AUDIT_LOG_ERROR", error);
    }
}