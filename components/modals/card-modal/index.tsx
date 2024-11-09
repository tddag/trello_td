"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useCardModal } from "@/hooks/use-card-modal";
import { fetcher } from "@/lib/fetcher";
import Card from "@/types/Card";
import { useQuery } from "@tanstack/react-query";
import { Header } from "./header";

export const CardModal = () => {

    const { id, isOpen, onClose } = useCardModal(state => state); 
    
    const { data: cardData } = useQuery<Card>({
        queryKey: ["card", id],
        queryFn: () => {
            if (id) return fetcher(`/api/cards/${id}`)
            return Promise.resolve({})
        }
    })

    return (
        <Dialog
            open={isOpen}
            onOpenChange={onClose}
        >
            <DialogContent>
                {!cardData 
                    ? <Header.Skeleton/>
                    : <Header data={cardData}/>
                }
                
            </DialogContent>
        </Dialog>
    )
}