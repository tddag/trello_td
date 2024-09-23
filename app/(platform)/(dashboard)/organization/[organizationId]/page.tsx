import { OrganizationSwitcher } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import db from "@/lib/db";
import { create } from "@/actions/create-board";
import { Button } from "@/components/ui/button";
import { Board } from "./board";

const OrganizationIdPage = async () => {

    // const { userId, orgId } = auth();

    const connection = await db;

    const [boards, fields] = await connection.query(`SELECT * FROM board;`);

    console.log(boards);
    console.log(fields)

    return (
        <div className="flex flex-col space-y-4">
            <form action={create}>
                <input
                    id="title"
                    name="title"
                    required
                    placeholder="Enter a board title"
                    className="border-black border p-1"
                />

                <Button type="submit">
                    Submit
                </Button>
            </form>

            <div className="space-y-2">
                {boards.map((board: any) => (
                    <Board key={board.id} title={board.title} id={board.id}/>
                ))}
            </div>
        </div>
    )
}

export default OrganizationIdPage;