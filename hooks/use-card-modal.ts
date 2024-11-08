import { create } from "zustand";

type CardModalStore = {
    id?: number | string ;
    isOpen: boolean;
    onOpen: (id: number | string) => void;
    onClose: () => void;
}

export const useCardModal = create<CardModalStore>((set) => ({
    id: undefined,
    isOpen: false,
    onOpen: (id: number | string) => set({ isOpen: true, id}),
    onClose: () => set({ isOpen: false, id: undefined})
}))