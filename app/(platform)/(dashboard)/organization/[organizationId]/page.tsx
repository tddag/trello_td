import { OrganizationSwitcher } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import db from "@/lib/db";

import { Board } from "./board";
import { Form } from "./form";
import { Info } from "./_components/info";
import { Separator } from "@/components/ui/separator";
import { BoardList } from "./_components/board-list";
import { Suspense } from "react";

const OrganizationIdPage = async () => {

    // const { userId, orgId } = auth();

    // const connection = await db();

    // const [boards, fields] = await connection.query(`SELECT * FROM board;`);

    // console.log(boards);
    // console.log(fields)

    return (
        <div className="w-full mb-20">
            {/* <Form/>

            <div className="space-y-2">
                {boards.map((board: any) => (
                    <Board key={board.id} title={board.title} id={board.id}/>
                ))}
            </div> */}

            <Info/>
            <Separator className="my-4"/>
            <div className="px-2 md:px-4">

                <Suspense fallback={<BoardList.Skeleton/>}>
                    <BoardList/>
                </Suspense>
            </div>
        </div>
    )
}

export default OrganizationIdPage;