"use client"

import { api } from "@/convex/_generated/api"
import { Doc, Id } from "@/convex/_generated/dataModel"
import { useQuery } from "convex/react"
import ProjectEdit from "./_components/project-edit"
import PortfolioEdit from "./_components/portfolio-edit"

export default function SubmitEditPage({ params }: { params: { type: string; id: string } }) {
    const project = useQuery(api.projects.get, { projectId: params.id as Id<"projects"> }) as Doc<"projects"> | null
    const portfolio = useQuery(api.portfolios.get, { portfolioId: params.id as Id<"portfolios"> }) as Doc<"portfolios"> | null

    const isProject = params.type === "project"
    const isPortfolio = params.type === "portfolio"

    if (!project && !portfolio) {
        return <div>Loading...</div>
    }

    return (
        <div>
            {isProject && project && <ProjectEdit {...project} />}
            {isPortfolio && portfolio && <PortfolioEdit {...portfolio} />}
        </div>
    )
}
