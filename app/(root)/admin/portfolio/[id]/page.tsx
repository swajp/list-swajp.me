"use client"

import { api } from "@/convex/_generated/api"
import { Doc, Id } from "@/convex/_generated/dataModel"
import { useQuery } from "convex/react"
import PortfolioEdit from "../../_components/portfolio-edit"
export default function SubmitEditPage({ params }: { params: { type: string; id: string } }) {
    const portfolio = useQuery(api.portfolios.get, { portfolioId: params.id as Id<"portfolios"> }) as Doc<"portfolios">

    if (!portfolio) {
        return <div>Loading...</div>
    }

    return (
        <div>
            <PortfolioEdit {...portfolio} />
        </div>
    )
}
