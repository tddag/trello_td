import List from "./List";

type Card = {
    id: string | number,
    title: string,
    description: string | null,
    order: number,
    listId: string | number,
    createdAt: Date,
    updatedAt: Date,
    list: List
}

export default Card;