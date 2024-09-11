"use client";

import {
    UserButton
} from "@clerk/nextjs";

const ProtectedPage = () => {
    return (
        <div>
            <UserButton/>
            Protected
        </div>
    )
}

export default ProtectedPage;