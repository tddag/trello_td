import { OrganizationSwitcher } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import db from "@/lib/db";

const OrganizationIdPage = () => {

    const { userId, orgId } = auth();

    async function create(formData: FormData) {
        "use server";

        const title = formData.get("title")

        const q = `INSERT INTO board (title) VALUES (?)`
        db.query(q, [title], (err: any, data: any) => {
            if (err) {
                console.log("Failed to create board")
                console.log(err)
                return;
            }
            console.log("Create board successfully!");
        })
        
    }

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
            </form>
        </div>
    )
}

export default OrganizationIdPage;