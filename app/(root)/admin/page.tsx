import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import SubmitsTable from "./_components/submits-table"

export default async function AdminPage() {
    const ADMIN_EMAIL = process.env.ADMIN_EMAIL

    const user = await currentUser()

    const isAdmin = user?.emailAddresses[0].emailAddress === ADMIN_EMAIL

    if (!user || !isAdmin) {
        return redirect("/")
    }

    return (
        <div className="h-screen flex flex-col lg:flex-row gap-4">
            <SubmitsTable />
        </div>
    )
}
