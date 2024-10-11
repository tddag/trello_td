"use client";

import { copyList } from "@/actions/copy-list";
import { deleteList } from "@/actions/delete-list";
import { FormSubmit } from "@/components/form/form-submit";
import { Button } from "@/components/ui/button";
import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { useAction } from "@/hooks/use-action";
import List from "@/types/List";
import { MoreHorizontal, X } from "lucide-react";
import { ElementRef, useRef } from "react";
import { toast } from "sonner";

interface ListOptionsProps {
    data: List,
    onAddCard: () => void;
}

export const ListOptions = ({
    data,
    onAddCard
}: ListOptionsProps) => {

    const closeRef = useRef<ElementRef<"button">>(null);

    const { execute: executeDelete } = useAction(deleteList, {
        onSuccess: (data) => {
            toast.success(`List "${data.title}" deleted`)
            closeRef.current?.click();
        },
        onError: (error) => {
            toast.error(error);
        }
    })

    const { execute: executeCopy } = useAction(copyList, {
        onSuccess: (data) => {
            toast.success(`List "${data.title}" copied`)
            closeRef.current?.click();
        },
        onError: (error) => {
            toast.error(error);
        }
    })

    const onDelete = () => {
        executeDelete({
            id: data.id,
            boardId: data.boardId
        })
    }

    const onCopy = () => {
        executeCopy({
            id: data.id,
            boardId: data.boardId
        })
    }


    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button className="h-auto w-auto p-2" variant="ghost">
                    <MoreHorizontal className="h-4 w-4"/>

                </Button>
            </PopoverTrigger>

            <PopoverContent className="px-0 pt-3 pb-3" side="bottom">
                <div className="text-sm font-medium text-center text-neutral-600 pb-4">
                    List Actions

                </div>

                <PopoverClose ref={closeRef} asChild>
                    <Button className="h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600" variant="ghost">
                        <X className="h-4 w-4"/>
                    </Button>
                </PopoverClose>    

                <Button
                    onClick={onAddCard}
                    className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm"
                    variant="ghost"
                >
                        Add card...
                    
                </Button>        

                <form action={onCopy}>
                    <FormSubmit
                        variant="ghost"
                        className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm"
                    >
                        Copy list...

                    </FormSubmit>
                </form>   
                <Separator/>

                <form action={onDelete}>
                    <FormSubmit
                        variant="ghost"
                        className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm"
                    >
                        Delete this list

                    </FormSubmit>
                </form>   



            </PopoverContent>


        </Popover>
    )
}