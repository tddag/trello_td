import Card from "./Card";

type List = {
    id: number,
    title: string,
    order: number,
    boardId: number,
    createdAt: string,
    updatedAt: string,
    cards?: Card[]
}

export default List;