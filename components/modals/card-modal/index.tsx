"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useCardModal } from "@/hooks/use-card-modal";

export const CardModal = () => {

    const { id, isOpen, onClose } = useCardModal(state => state); 

    return (
        <Dialog
            open={isOpen}
            onOpenChange={onClose}
        >
            <DialogContent>
                I am a modal {id}
            </DialogContent>
        </Dialog>
    )
}