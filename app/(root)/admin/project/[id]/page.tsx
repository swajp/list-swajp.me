"use client"

import { api } from "@/convex/_generated/api"
import { Doc, Id } from "@/convex/_generated/dataModel"
import { useQuery } from "convex/react"
import ProjectEdit from "../../_components/project-edit"
import PortfolioEdit from "../../_components/portfolio-edit"
export default function SubmitEditPage({ params }: { params: { type: string; id: string } }) {
    const project = useQuery(api.projects.get, { projectId: params.id as Id<"projects"> }) as Doc<"projects">
    if (!project) {
        return <div>Loading...</div>
    }

    return (
        <div>
            <ProjectEdit {...project} />
        </div>
    )
}
