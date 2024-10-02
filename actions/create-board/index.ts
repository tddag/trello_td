"use server";

import { auth } from "@clerk/nextjs/server";

import { InputType, ReturnType } from "./type";
import { revalidatePath } from "next/cache";
import { CreateBoard } from "./schema";
import { createSafeAction } from "@/lib/create-safe-action";
import db from "@/lib/db";
 

const handler = async (data: InputType): Promise<ReturnType> => {
    const { userId, orgId } = auth();

    if (!userId || !orgId) {
        return {
            error: "Unauthorized",
        }
    }
    

    const { title, image } = data;

    const [
        imageId,
        imageThumbUrl,
        imageFullUrl,
        imageLinkHTML,
        imageUserName
    ] = image.split("|")

    if (!imageId || !imageThumbUrl || !imageFullUrl || !imageUserName || !imageLinkHTML) {
        return {
            error: "Missing fields. Failed to create board."
        }
    }

    let board;

    try {
        const connection = await db();


        let q = `INSERT INTO board (title, orgId, imageId, imageThumbUrl, imageFullUrl, imageUserName, imageLinkHTML) VALUES (?, ?, ?, ?, ?, ?, ?)`
        await connection.query(q, [title, orgId, imageId, imageThumbUrl, imageFullUrl, imageUserName, imageLinkHTML])

        q = `SELECT * FROM board`;
        const [res] = await connection.query(q)    

        board = res[res.length - 1];

    } catch (e) {
        console.log(e);
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