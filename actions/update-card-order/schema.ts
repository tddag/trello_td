import { z } from "zod";

export const UpdateCardOrder = z.object({

    items: z.array(
        z.object({
            id: z.union([z.string(), z.number()]),
            title: z.string(),
            description: z.union([z.string(), z.null()]),
            order: z.number(),
            listId: z.union([z.string(), z.number()]),
            createdAt: z.date(),
            updatedAt: z.date(),
        })
    ),
    boardId: z.union([z.string(), z.number()]),
})