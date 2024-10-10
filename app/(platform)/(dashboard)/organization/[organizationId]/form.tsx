// NO LONGER USE


"use client";

// import { create } from "@/actions/create-board";
// import { Button } from "@/components/ui/button";
// import { useFormState } from "react-dom";

import { createBoard } from "@/actions/create-board";
// import { FormInput } from "./form-input";
// import { FormButton } from "./form-button";
import { useAction } from "@/hooks/use-action";
import { FormInput } from "@/components/form/form-input";
import { FormSubmit } from "@/components/form/form-submit";

export const Form = () => {

    // const initialState = { 
    //     message: '', 
    //     errors: {
    //         title: []
    //     }
    // };
    // const [state, dispatch] = useFormState(create, initialState);

    const { execute, fieldErrors } = useAction(
        createBoard, 
        {
            onSuccess: (data) => {
                console.log(data, "SUCCESS")
            },
            onError: (error) => {
                console.error(error)
            }
        }
    );

    const onSubmit = (formData: FormData) => {
        const title = formData.get("title") as string;

        execute({ title, image: ""})
    }

    return (
        <form action={onSubmit}>
            <div className="flex flex-col space-y-2">
                <FormInput 
                    label="Board Title"
                    id="title" errors={fieldErrors}
                />
            </div>


            <FormSubmit>
                Save
            </FormSubmit>

            
            
        </form>
    )
}