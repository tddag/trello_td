import { z } from "zod";

export const CopyCard = z.object({
    id: z.union([z.string(), z.number()]),
    boardId: z.union([z.string(), z.number()]),

})