"use client";

import Card from "@/types/Card";
import List from "@/types/List";
import { ListForm } from "./list-form";
import { useState } from "react";
import { ListItem } from "./list-item";

interface ListContainerProps {
    boardId: number,
    data: List[],
};

export const ListContainer = ({
    boardId,
    data,
}: ListContainerProps) => {

    const [orderedData, setOrderedData] = useState(data);

    return (
        <ol className="flex gap-x-3 h-full">

            {orderedData.map((list, index) => {
                return (
                    <ListItem
                        key={list.id}
                        index={index}
                        data={list}
                    />
                )
            })}

            <ListForm 
            />

            <div className="flex-shrink-0 w-1"/>
        </ol>
    )
}