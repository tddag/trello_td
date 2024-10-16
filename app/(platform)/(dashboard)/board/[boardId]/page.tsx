import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import db from "@/lib/db";
import Card from "@/types/Card";
import { ListContainer } from "./_components/list-container";
import List from "@/types/List";
interface BoardIdPageProps {
    params: {
        boardId: number;
    }
}

const BoardIdPage = async ({
    params
}: BoardIdPageProps) => {


    const { orgId } = auth();

    if (!orgId) {
        redirect('/select-org');
    }

    const dbConnection = await db();

    let q: string = `SELECT * FROM list WHERE boardId = ? ORDER BY \`order\` ASC`

    let lists: List[];
    [lists] = await dbConnection.query(q, [params.boardId]);

    for (let list of lists) {
        q = `SELECT * FROM card WHERE listId = ? ORDER BY \`order\` ASC`
        let [resultCards] = await dbConnection.query(q, [list.id])

        if (list.cards) {
            list.cards = list.cards.concat(resultCards);
        } else {
            list.cards = resultCards;
        }
    }


    return (
        <div className="p-4 h-full overflow-x-auto">
            <ListContainer
                boardId={params.boardId}
                data={lists}
            />
        </div>
    )
}

export default BoardIdPage;