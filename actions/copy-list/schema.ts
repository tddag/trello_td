import { z } from "zod";

export const CopyList = z.object({
    id: z.union([z.string(), z.number()]),
    boardId: z.union([z.string(), z.number()]),

})