"use client"

import Image from "next/image"
import Link from "next/link"
import { buttonVariants } from "./ui/button"
import { Project } from "@/data"
import { useMutation, useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel"
import SubmitDialog from "./submit-dialog"
import SubmitActionCard from "./submit-action-card"

interface ListProps {
    projects: Project[]
}

export default function ProjectsList() {
    const projects = useQuery(api.projects.collection)

    const updateViews = useMutation(api.projects.updateViews)

    if (!projects) {
        return <div>Loading...</div>
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 py-8">
            {projects.map(project => (
                <Link
                    onClick={() => {
                        updateViews({ projectId: project._id as Id<"projects"> })
                    }}
                    target="_blank"
                    href={project.url}
                    key={project.name}
                    className="relative border rounded-lg"
                >
                    <Image className="rounded-lg" quality={100} src={`/projects/${project.img!}`} alt={project.name} width={453} height={254} />
                    <div className="absolute bottom-0 left-0 right-0  p-3">
                        <div
                            className={buttonVariants({
                                variant: "default",
                                className: "!rounded-full text-xs border border-secondary/20 gap-0.5 h-7 !px-2"
                            })}
                        >
                            {project.name}
                        </div>
                    </div>
                </Link>
            ))}
            <SubmitDialog>
                <button className="outline-none">
                    <SubmitActionCard text="Submit my own project. 🚀" />
                </button>
            </SubmitDialog>
        </div>
    )
}
