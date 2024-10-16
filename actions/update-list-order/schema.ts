import { z } from "zod";

export const UpdateListOrder = z.object({

    items: z.array(
        z.object({
            id: z.union([z.string(), z.number()]),
            title: z.string(),
            order: z.number(),
            createdAt: z.date(),
            updatedAt: z.date(),
            boardId: z.number()
        })
    ),
    boardId: z.union([z.string(), z.number()]),
})