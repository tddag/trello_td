import { OrganizationSwitcher } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import db from "@/lib/db";

import { Board } from "./board";
import { Form } from "./form";

const OrganizationIdPage = async () => {

    // const { userId, orgId } = auth();

    const connection = await db;

    const [boards, fields] = await connection.query(`SELECT * FROM board;`);

    console.log(boards);
    console.log(fields)

    return (
        <div className="flex flex-col space-y-4">
            <Form/>

            <div className="space-y-2">
                {boards.map((board: any) => (
                    <Board key={board.id} title={board.title} id={board.id}/>
                ))}
            </div>
        </div>
    )
}

export default OrganizationIdPage;