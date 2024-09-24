"use server";
import db from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { z } from 'zod';

export type State = {
    message?: string | null;
    errors?: {
        title?: string[];
    }
}

const CreateBoard = z.object({
    title: z.string().min(3, {
        message: "Minimum length of 3 letters is required"
    })
})

export async function create(prevState: State, formData: FormData) {

    // const title = formData.get("title")

    const validatedFields = CreateBoard.safeParse({
        title: formData.get("title")
    })

    if (!validatedFields.success) {
        return {
            message: "Missing fields",
            errors: validatedFields.error.flatten().fieldErrors
        }
    }

    const { title } = validatedFields.data;

    try {
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
    } catch (e) {
        return {
            message: "Database error",
            errors: {}
        }
    }


    revalidatePath("/organization/org_2lzEBlBqmiTJHsMWN3c0XAETWrA");
    redirect("/organization/org_2lzEBlBqmiTJHsMWN3c0XAETWrA");
    
}