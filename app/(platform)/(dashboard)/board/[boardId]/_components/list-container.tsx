"use client";

import Card from "@/types/Card";
import List from "@/types/List";
import { ListForm } from "./list-form";

interface ListContainerProps {
    boardId: number,
    data: List[],
};

export const ListContainer = ({
    boardId,
    data,
}: ListContainerProps) => {

    return (
        <ol>
            <ListForm/>

            <div className="flex-shrink-0 w-1"/>
        </ol>
    )
}