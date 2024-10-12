"use client";

import { FormSubmit } from "@/components/form/form-submit";
import { FormTextarea } from "@/components/form/form-textarea";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import { forwardRef } from "react";

interface CardFormProps {
    listId: number;
    enableEditing: () => void;
    disableEditing: () => void;
    isEditing: boolean;
}

export const CardForm = forwardRef<HTMLTextAreaElement, CardFormProps>(({
    listId,
    enableEditing,
    disableEditing,
    isEditing,
}, ref) => {


    if (isEditing) {
        return (
            <form
                className="m-1 py-0.5 px-1 space-y-4"
            >
                <FormTextarea
                    id="title"
                    onKeyDown={() => {}}
                    ref={ref}
                    placeholder="Enter a title for this card..."
                />

                <div className="flex items-center gap-x-1">
                    <FormSubmit>
                        Add Card
                    </FormSubmit>

                    <Button onClick={disableEditing} size="sm" variant="ghost">
                        <X className="h-5 w-5"/>
                    </Button>
                </div>

            </form>
        )
    }

    return (
        <div className="pt-2 px-2">
            <Button
                onClick={enableEditing}
                className="h-auto px-2 py-1.5 w-full justify-start text-muted-foreground text-sm"
                variant="ghost"
            >
                <Plus className="h-4 w-4 mr-2"/>
                Add a Card

            </Button>
        </div>
    )
})

CardForm.displayName = "CardForm";