import { auth } from "@clerk/nextjs/server";
import { notFound, redirect } from "next/navigation";
import db from "@/lib/db";
import { BoardNavBar } from "./_components/board-navbar";

export async function generateMetadata({
    params
}: {
    params: { boardId: string}
}) {
    const { orgId } = auth();

    if (!orgId) {
        return {
            title: "Board"
        }
    }

    const connection = await db();
    
    let q = `SELECT * FROM board WHERE id = ? AND orgId = ?`;

    const [boards] = await connection.query(q, [params.boardId, orgId])

    const board = boards[0];    

    return {
        title: board?.title || "Board"
    }

}


const BoardIdLayout = async ({
    children,
    params
}: {
    children: React.ReactNode;
    params: { boardId: string}
}) => {

    const { orgId } = auth();

    if (!orgId) {
        redirect("/select-org");
    }

    const connection = await db();
    
    let q = `SELECT * FROM board WHERE id = ? AND orgId = ?`;

    const [boards] = await connection.query(q, [params.boardId, orgId])

    // console.log("TD Board result: ")
    // console.log(boards[0])
    const board = boards[0];
    if (!board) {
        notFound();
    }

    return (
        <div
            className="relative h-full bg-no-repeat bg-cover bg-center"
            style={{backgroundImage: `url(${board.imageFullUrl})`}}
        >

            <BoardNavBar board={board}/>

            <div className="absolute inset-0 bg-black/10"/>

            <main className="relative pt-28 h-full">
                {children}
            </main>
        </div>
    )
}

export default BoardIdLayout;