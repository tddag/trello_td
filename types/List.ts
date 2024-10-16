import Card from "./Card";

type List = {
    id: string | number,
    title: string,
    order: number,
    boardId: number,
    createdAt: Date,
    updatedAt: Date,
    cards?: Card[]
}

export default List;