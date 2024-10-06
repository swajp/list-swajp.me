"use client"

import { api } from "@/convex/_generated/api"
import { Doc, Id } from "@/convex/_generated/dataModel"
import { useQuery } from "convex/react"
import ProjectEdit from "./_components/project-edit"
import PortfolioEdit from "./_components/portfolio-edit"

export default function SubmitEditPage({ params }: { params: { type: string; id: string } }) {
    const project = params.type === "project" ? (useQuery(api.projects.get, { projectId: params.id as Id<"projects"> }) as Doc<"projects">) : null
    const portfolio = params.type === "portfolio" ? useQuery(api.portfolios.get, { portfolioId: params.id as Id<"portfolios"> }) : null

    if (!project && !portfolio) {
        return <div>Loading...</div>
    }
    return (
        <div>
            {project && <ProjectEdit {...project} />}
            {portfolio && <PortfolioEdit {...portfolio} />}
        </div>
    )
}
