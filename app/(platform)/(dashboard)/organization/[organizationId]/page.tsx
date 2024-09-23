import { OrganizationSwitcher } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import db from "@/lib/db";
import { create } from "@/actions/create-board";
import { Button } from "@/components/ui/button";

const OrganizationIdPage = async () => {

    // const { userId, orgId } = auth();

    const boards = await db.query(`SELECT * FROM board;`, (err: any, data: any) => {
        if (err) {
            console.log("Failed to get all boards");
            console.log(err);
        }
        console.log("Get all boards successfully")
        // console.log(data)
        return data
        
    })

    console.log(boards);

    return (
        <div>
            <form action={create}>
                <input
                    id="title"
                    name="title"
                    required
                    placeholder="Enter a board title"
                    className="border-black border p-1"
                />

                <Button type="submit">
                    Submit
                </Button>
            </form>
        </div>
    )
}

export default OrganizationIdPage;