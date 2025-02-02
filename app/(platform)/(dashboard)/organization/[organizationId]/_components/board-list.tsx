import  db from '@/lib/db';
import { FormPopover } from "@/components/form/form-popover"
import { Hint } from "@/components/hint"
import { HelpCircle, User2 } from "lucide-react"
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Board } from '@/types/Board';
import { Skeleton } from '@/components/ui/skeleton';

export const BoardList = async () => {

    const { orgId } = auth();
    if (!orgId) {
        return redirect("/select-org");
    }

    const connection = await db();

    const [boards, fields] = await connection.query(`SELECT * FROM board WHERE orgId = ? ORDER BY createdAt DESC;`, [orgId]);

    // console.log(boards);
    // console.log(fields)


    return (
        <div className="space-y-4">
            <div className="flex items-center font-semibold text-lg text-neutral-700">
                <User2 className="h-6 w-6 mr-2"/>
                Your boards 
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">

                <FormPopover sideOffset={10} side="right">
                    <div
                        role="button"
                        className="aspect-video relative h-full w-full bg-muted rounded-sm flex flex-col gap-y-1 items-center justify-center hover:opacity-75 transition"
                    >
                        <p className="text-sm">Create new board</p>

                        <Hint
                            sideOffset={40}
                            description={`
                                Free Workspaces can have up to 5 open boards. For unlimited boards upgrade this workspace.    
                            `}
                        >
                            <HelpCircle
                                className="absolute bottom-2 right-2 h-[14px] w-[14px]"
                            />
                        </Hint>
                    </div>
                </FormPopover>

                {boards.map((board: Board) => (
                    <Link
                        key={board.id}
                        href={`/board/${board.id}`}
                        className="group relative aspect-video bg-no-repeat bg-center bg-cover bg-sky-700 rounded-sm h-full w-full p-2 overflow-hidden"
                        style={{ backgroundImage: `url(${board.imageThumbUrl})`}}
                    >
                        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition"/>

                        <p className="relative font-semibold text-white">
                            {board.title}
                        </p>
                    
                    </Link>
                ))}

            </div>
        </div>
    )
}

BoardList.Skeleton = function SkeletonBoardList() {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            <Skeleton className="aspect-video h-full w-ful p-2"/>
            <Skeleton className="aspect-video h-full w-ful p-2"/>
            <Skeleton className="aspect-video h-full w-ful p-2"/>
            <Skeleton className="aspect-video h-full w-ful p-2"/>
            <Skeleton className="aspect-video h-full w-ful p-2"/>
            <Skeleton className="aspect-video h-full w-ful p-2"/>
            <Skeleton className="aspect-video h-full w-ful p-2"/>
            <Skeleton className="aspect-video h-full w-ful p-2"/>            
        </div>
    )
}