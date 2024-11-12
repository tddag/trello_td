import { z } from "zod";

export const DeleteCard = z.object({
    id: z.union([z.string(), z.number()]),
    boardId: z.union([z.string(), z.number()]),

})