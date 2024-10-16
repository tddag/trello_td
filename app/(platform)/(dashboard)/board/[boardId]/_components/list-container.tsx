"use client";

import Card from "@/types/Card";
import List from "@/types/List";
import { ListForm } from "./list-form";
import { useEffect, useState } from "react";
import { ListItem } from "./list-item";

import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import { useAction } from "@/hooks/use-action";
import { updateListOrder } from "@/actions/update-list-order";
import { toast } from "sonner";
import { updateCardOrder } from "@/actions/update-card-order";

interface ListContainerProps {
    boardId: number,
    data: List[],
};

function reorder<T>(
    list: T[], 
    startIndex: number, 
    endIndex: number
) {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
}

export const ListContainer = ({
    boardId,
    data,
}: ListContainerProps) => {
    
    const [orderedData, setOrderedData] = useState(data);

    const { execute: executeUpdateListOrder } = useAction(updateListOrder, {
        onSuccess: () => {
            toast.success("list reordered");
        },
        onError: (error) => {
            toast.error(JSON.stringify(error));
        }
    })

    const { execute: executeUpdateCardOrder } = useAction(updateCardOrder, {
        onSuccess: () => {
            toast.success("card reordered");
        },
        onError: (error) => {
            toast.error(JSON.stringify(error));
        }
    })    

    useEffect(() => {
        setOrderedData(data)
    }, [data])

    const onDragEnd = (result: any) => {

        const { destination, source, type } = result;

        if (!destination) {
            return;
        }

        // if dropped in the same position
        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        // User moves a list
        if (type === "list") {
            const items = reorder(
                orderedData,
                source.index,
                destination.index
            ).map((item, index) => ({
                ...item,
                order: index
            }))

            setOrderedData(items);
            // TODO: Trigger Server Action
            executeUpdateListOrder({
                items,
                boardId
            })
        }

        // User moves a card
        if (type === "card") {
            // console.log("TD move card")
            // console.log(source)
            // console.log(destination)

            let newOrderedData = [...orderedData];
            
            console.log(newOrderedData)


            // Source and Destination list
            const sourceList = newOrderedData.find(list => list.id == source.droppableId);
            const destList = newOrderedData.find(list => list.id == destination.droppableId);

            // console.log("TD move card 2")
            // console.log(sourceList)
            // console.log(destList)

            if (!sourceList || !destList) {
                return
            }

            // Check if card exists on the sourceList
            if (!sourceList.cards) {
                sourceList.cards = [];
            }

            // Check if card exists on the destList
            if (!destList.cards) {
                destList.cards = [];
            }

            // Moving the card in the same list
            if (source.droppableId === destination.droppableId) {
                console.log("TD move card in the same list")

                // rearrange card in list
                const reorderedCards = reorder(
                    sourceList.cards,
                    source.index,
                    destination.index
                )

                // update corresponding order after rearrangement
                reorderedCards.forEach((card, idx) => {
                    card.order = idx;
                })

                sourceList.cards = reorderedCards;

                setOrderedData(newOrderedData);
                // TODO: trigger server action
                executeUpdateCardOrder({
                    boardId,
                    items: reorderedCards
                })
            } 
            
            else { // User moves the card to another list
                // remove card from the source list
                const [movedCard] = sourceList.cards.splice(source.index, 1);

                // assign the new listId to the moved card
                movedCard.listId = destination.droppableId;

                // add card to the destination list
                destList.cards.splice(destination.index, 0, movedCard)

                // update corresponding order # after remove card from source list and add to destination list
                sourceList.cards.forEach((card, idx) => {
                    card.order = idx;
                })
                destList.cards.forEach((card, idx) => {
                    card.order = idx;
                })       
                
                setOrderedData(newOrderedData);
                // TODO: trigger server action
                executeUpdateCardOrder({
                    boardId,
                    items: destList.cards
                })
            }

        }

    }

    return (

        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="lists" type="list" direction="horizontal">
                { (provided) => (
                    <ol 
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className="flex gap-x-3 h-full"
                    >

                        {orderedData.map((list, index) => {
                            return (
                                <ListItem
                                    key={list.id}
                                    index={index}
                                    data={list}
                                />
                            )
                        })}

                        {provided.placeholder}

                        <ListForm 
                        />

                        <div className="flex-shrink-0 w-1"/>
                    </ol>
                )}
                
            </Droppable>
        </DragDropContext>            
    )
}