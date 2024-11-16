import { ACTION, AuditLog } from "@/types/AuditLog";


export const generateLogMessage = (log: AuditLog) => {
    const { action, entityTitle, entityType } = log;

    switch (action) {
        case ACTION.CREATE:
            return `created ${entityType.toLowerCase()} "${entityTitle}"`;
        case ACTION.UPDATE:
            return `updated ${entityType.toLowerCase()} "${entityTitle}"`;
        case ACTION.DELETE:
            return `deleted ${entityType.toLowerCase()} "${entityTitle}"`;
        case ACTION.CREATE:
            return `unknown action ${entityType.toLowerCase()} "${entityTitle}"`;

    }
}