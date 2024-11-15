export enum ACTION {
    CREATE = 'CREATE',
    UPDATE = 'UPDATE',
    DELETE = 'DELETE',
}

export enum ENTITY_TYPE {
    BOARD = 'BOARD',
    LIST = 'LIST',
    CARD = 'CARD'
}

export type AuditLog = {
    id: string | number,
    orgId: string,
    action: ACTION,
    entityId: string,
    entityType: ENTITY_TYPE,
    userId: string,
    userImage: string,
    userName: string,
    createdAt: Date,
    updatedAt: Date
}