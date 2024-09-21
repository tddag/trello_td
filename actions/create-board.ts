"use server";
import db from "@/lib/db";

export async function create(formData: FormData) {

    const title = formData.get("title")

    const q = `INSERT INTO board (title) VALUES (?)`
    db.query(q, [title], (err: any, data: any) => {
        if (err) {
            console.log("Failed to create board")
            console.log(err)
            return;
        }
        console.log("Create board successfully!");
    })
    
}