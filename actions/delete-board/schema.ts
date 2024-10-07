import { z } from "zod";

export const DeleteBoard = z.object({
    id: z.union([z.string(), z.number()]),
})