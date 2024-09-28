"use server";

import { auth } from "@clerk/nextjs/server";

import { InputType, ReturnType } from "./type";
import { revalidatePath } from "next/cache";
import { CreateBoard } from "./schema";
import { createSafeAction } from "@/lib/create-safe-action";
import db from "@/lib/db";
 

const handler = async (data: InputType): Promise<ReturnType> => {
    const { userId } = auth();

    if (!userId) {
        return {
            error: "Unauthorized",
        }
    }
    

    const { title } = data;

    let board;

    try {
        const connection = await db();


        let q = `INSERT INTO board (title) VALUES (?)`
        await connection.query(q, [title])

        q = `SELECT * FROM board`;
        const [res] = await connection.query(q)    

        board = res[res.length - 1];

    } catch (e) {
        return {
            error: "Failed to create."
        }
    }

    revalidatePath(`/board/${board.id}`);
    return { data: board }
}

export const createBoard = createSafeAction(CreateBoard, handler);


// import db from "@/lib/db";
// import { revalidatePath } from "next/cache";
// import { redirect } from "next/navigation";

// import { z } from 'zod';

// export type State = {
//     message?: string | null;
//     errors?: {
//         title?: string[];
//     }
// }

// const CreateBoard = z.object({
//     title: z.string().min(3, {
//         message: "Minimum length of 3 letters is required"
//     })
// })

// export async function create(prevState: State, formData: FormData) {

//     // const title = formData.get("title")

//     const validatedFields = CreateBoard.safeParse({
//         title: formData.get("title")
//     })

//     if (!validatedFields.success) {
//         return {
//             message: "Missing fields",
//             errors: validatedFields.error.flatten().fieldErrors
//         }
//     }

//     const { title } = validatedFields.data;

//     try {
//         const connection = await db();

//         const q = `INSERT INTO board (title) VALUES (?)`
//         await connection.query(q, [title], (err: any, data: any) => {
//             if (err) {
//                 console.log("Failed to create board")
//                 console.log(err)
//                 return;
//             }
//             console.log("Create board successfully!");
//         })
//     } catch (e) {
//         return {
//             message: "Database error",
//             errors: {}
//         }
//     }


//     revalidatePath("/organization/org_2lzEBlBqmiTJHsMWN3c0XAETWrA");
//     redirect("/organization/org_2lzEBlBqmiTJHsMWN3c0XAETWrA");
    
// }