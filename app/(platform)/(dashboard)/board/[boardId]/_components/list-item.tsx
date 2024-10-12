"use client";

import List from "@/types/List";
import { ListHeader } from "./list-header";
import { ElementRef, useRef, useState } from "react";
import { CardForm } from "./card-form";

interface ListItemProps {
    index: number, 
    data: List
}

export const ListItem = ({
    index,
    data
}: ListItemProps) => {

    const textareaRef = useRef<ElementRef<"textarea">>(null);
    const [isEditing, setIsEditing] = useState(false);

    const disableEditing = () => {
        setIsEditing(false);
    }

    const enableEditing = () => {
        console.log("Enable Editing")
        setIsEditing(true);
        setTimeout(() => {
            textareaRef.current?.focus();
        })
    }

    return (
        <li className="shrink-0 h-full w-[272px] select-none">
            <div className="w-full rounded-md bg-[#f1f2f4] shadow-md pb-2" >
                <ListHeader 
                    onAddCard={enableEditing}
                    data={data}
                />

                <CardForm
                    listId={data.id}
                    ref={textareaRef}
                    isEditing={isEditing}
                    enableEditing={enableEditing}
                    disableEditing={disableEditing}
                />
            </div>

        </li>
    )
}