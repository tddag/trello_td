// NO LONGER USE

"use client";

import { Input } from "@/components/ui/input";
import { useFormStatus } from "react-dom";

interface FormInputProps {
    errors?: {
        title?: string[]
    }
}

export const FormInput = ({
    errors
} : FormInputProps) => {

    const { pending } = useFormStatus();

    return (
        <div>
            <Input
                id="title"
                name="title"
                required
                placeholder="Enter a board title"
                disabled={pending}
                className="mb-1"
            />
            {errors?.title ? (
                    <div className="mb-1">
                        {errors.title.map((error: string) => (
                            <p key={error} className="text-rose-500">
                                {error}
                            </p>
                        ))}
                    </div>
            ): null}
        </div>

    )
}