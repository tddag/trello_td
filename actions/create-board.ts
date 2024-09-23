"use server";
import db from "@/lib/db";

import { z } from 'zod';

const CreateBoard = z.object({
    title: z.string()
})

export async function create(formData: FormData) {

    // const title = formData.get("title")

    const { title } = CreateBoard.parse({
        title: formData.get("title")
    })

    const connection = await db;

    const q = `INSERT INTO board (title) VALUES (?)`
    await connection.query(q, [title], (err: any, data: any) => {
        if (err) {
            console.log("Failed to create board")
            console.log(err)
            return;
        }
        console.log("Create board successfully!");
    })
    
}