"use client"

import Image from "next/image"
import Link from "next/link"
import { buttonVariants } from "./ui/button"
import { Project } from "@/data"
import { Category } from "@/app/(root)/page"
import { useMutation, useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel"
import SubmitActionCard from "./submit-action-card"
import SubmitDialog from "./submit-dialog"
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs"
import { Skeleton } from "./ui/skeleton"

interface ListProps {
    projects: Project[]
}

export default function CommunityList() {
    const projects = useQuery(api.portfolios.collection)

    const updateViews = useMutation(api.portfolios.updateViews)

    if (!projects) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 py-8">
                <Skeleton>
                    <Image className="rounded-lg opacity-0" quality={1} src="/community/fuma.png" alt="skeleton" width={453} height={254} />
                </Skeleton>
                <Skeleton>
                    <Image className="rounded-lg opacity-0" src="/community/fuma.png" alt="skeleton" width={453} height={254} />
                </Skeleton>
                <Skeleton>
                    <Image className="rounded-lg opacity-0" quality={1} src="/community/fuma.png" alt="skeleton" width={453} height={254} />
                </Skeleton>
                <Skeleton className="hidden md:block">
                    <Image className="rounded-lg opacity-0" quality={1} src="/community/fuma.png" alt="skeleton" width={453} height={254} />
                </Skeleton>
                <Skeleton className="hidden md:block">
                    <Image className="rounded-lg opacity-0" quality={1} src="/community/fuma.png" alt="skeleton" width={453} height={254} />
                </Skeleton>
                <Skeleton className="hidden md:block">
                    <Image className="rounded-lg opacity-0" quality={1} src="/community/fuma.png" alt="skeleton" width={453} height={254} />
                </Skeleton>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 py-8">
            {projects.map(project => (
                <Link
                    onClick={() => {
                        updateViews({ portfolioId: project._id as Id<"portfolios"> })
                    }}
                    target="_blank"
                    href={project.url}
                    key={project.name}
                    className="relative border rounded-lg"
                >
                    <Image className="rounded-lg" quality={100} src={`/community/${project.img!}`} alt={project.name} width={453} height={254} />
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
            <SignedIn>
                <SubmitDialog>
                    <button className="outline-none">
                        <SubmitActionCard text="Submit my own portfolio. 💌" />
                    </button>
                </SubmitDialog>
            </SignedIn>
            <SignedOut>
                <SignInButton mode="modal">
                    <button className="outline-none">
                        <SubmitActionCard text="Submit my own portfolio. 💌" />
                    </button>
                </SignInButton>
            </SignedOut>
        </div>
    )
}
