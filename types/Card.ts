type Card = {
    id: string | number,
    title: string,
    description: string | null,
    order: number,
    listId: string | number,
    createdAt: Date,
    updatedAt: Date
}

export default Card;