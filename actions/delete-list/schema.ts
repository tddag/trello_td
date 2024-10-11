import { z } from "zod";

export const DeleteList = z.object({
    id: z.union([z.string(), z.number()]),
    boardId: z.union([z.string(), z.number()]),

})