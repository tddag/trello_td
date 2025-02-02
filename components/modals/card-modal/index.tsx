"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useCardModal } from "@/hooks/use-card-modal";
import { fetcher } from "@/lib/fetcher";
import Card from "@/types/Card";
import { useQuery } from "@tanstack/react-query";
import { Header } from "./header";
import { Description } from "./description";
import { Actions } from "./actions";
import { AuditLog } from "@/types/AuditLog";
import { Activity } from "./activity";

export const CardModal = () => {

    const { id, isOpen, onClose } = useCardModal(state => state); 
    
    const { data: cardData } = useQuery<Card>({
        queryKey: ["card", id],
        queryFn: () => {
            if (id) return fetcher(`/api/cards/${id}`)
            return Promise.resolve({})
        }
    })

    const { data: auditLogsData } = useQuery<AuditLog[]>({
        queryKey: ["card-logs", id],
        queryFn: () => {
            if (id) return fetcher(`/api/cards/${id}/logs`)
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

                <div className="grid grid-cols-1 md:grid-cols-4 md:gap-4">
                    <div className="col-span-3">
                        <div className="w-full space-y-6">
                            {!cardData
                                ? <Description.Skeleton/>
                                : <Description data={cardData}/>
                            }

                            {!auditLogsData
                                ? <Activity.Skeleton/>
                                : <Activity items={auditLogsData}/>
                            }

                        </div>
                    </div>

                    {!cardData
                        ? <Actions.Skeleton/>
                        : <Actions data={cardData}/>
                    }


                </div>
                
            </DialogContent>
        </Dialog>
    )
}