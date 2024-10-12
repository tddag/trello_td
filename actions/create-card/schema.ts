import { z } from "zod";

export const CreateCard = z.object({
    title: z.string({
        required_error: "Title is required",
        invalid_type_error: "Title is required",
    }).min(3 , {
        message: "Title is too short"
    }),
    boardId: z.union([z.string(), z.number()]),
    listId: z.union([z.string(), z.number()]),
})