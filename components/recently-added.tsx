"use client"

import { api } from "@/convex/_generated/api"
import { useMutation, useQuery } from "convex/react"
import Link from "next/link"
import Image from "next/image"
import { buttonVariants } from "./ui/button"
import { Skeleton } from "./ui/skeleton"
import { Id } from "@/convex/_generated/dataModel"
import { SignedIn, SignedOut, SignInButton, useUser } from "@clerk/nextjs"
import { ArrowUp, EyeIcon } from "lucide-react"

export default function RecentlyAdded() {
    const projects = useQuery(api.projects.collection, { published: true })
    const portfolios = useQuery(api.portfolios.collection, { published: true })

    const updateViewsProject = useMutation(api.projects.updateViews)
    const updateViewsPortfolio = useMutation(api.portfolios.updateViews)

    const { user } = useUser()

    if (!projects || !portfolios) {
        return (
            <Skeleton>
                <Image className="rounded-lg opacity-0" quality={1} src="/community/fuma.png" alt="skeleton" width={453} height={254} />
            </Skeleton>
        )
    }

    const handleUpdateViews = async (projectId: string) => {
        if (sortedData[0].type === "portfolio") {
            await updateViewsPortfolio({ portfolioId: projectId as Id<"portfolios"> })
        } else {
            await updateViewsProject({ projectId: projectId as Id<"projects"> })
        }
    }

    const mixedData = [...portfolios.map(p => ({ ...p, type: "portfolio" })), ...projects.map(p => ({ ...p, type: "project" }))]
    const sortedData = mixedData.sort((a, b) => new Date(b._creationTime).getTime() - new Date(a._creationTime).getTime()).slice(0, 1)

    return sortedData.map(project => (
        <Link
            onClick={() => {
                handleUpdateViews(project._id as string)
            }}
            target="_blank"
            href={project.url}
            key={project.name}
            className="relative border w-fit rounded-lg"
        >
            <div className="absolute -top-7 left-5 border border-b-0 text-xs bg-secondary px-3 py-1.5 rounded-t-lg">Recently added</div>
            <Image src={"/santa-hat.webp"} alt="Santa hat" width={38} height={38} className="absolute -top-5 z-10 -left-4 rotate-[14deg]" />
            <Image
                className="rounded-lg relative"
                quality={100}
                src={project.img?.startsWith("https") ? project.img : `/projects/${project.img}`}
                alt={project.name}
                width={453}
                height={254}
            />
            <div className="absolute top-0 left-0 right-0  p-3">
                <div
                    className={buttonVariants({
                        variant: "default",
                        className: "!rounded-full text-xs border border-secondary/20 gap-0.5 h-7 !px-2"
                    })}
                >
                    {project.name}
                </div>
            </div>
            {project.user && (
                <div className="absolute bottom-0 left-0 right-0  p-3">
                    <div
                        onClick={e => {
                            e.preventDefault()
                            e.stopPropagation()
                        }}
                        className="!rounded-full select-none text-xs gap-1.5 flex items-center font-medium h-7 px-2 bg-muted/70 w-fit "
                    >
                        {project.user.profileImg ? (
                            <Image
                                src={project.user.profileImg}
                                alt={project.user.username}
                                width={20}
                                height={20}
                                className="rounded-full inline-block"
                            />
                        ) : (
                            <div className="rounded-full w-5 h-5 bg-primary/50"></div>
                        )}

                        {project.user.username}
                    </div>
                </div>
            )}
            <SignedIn>
                <div className="absolute bottom-0 right-0 flex gap-1.5 p-3">
                    {project.owner === user?.id ? (
                        <>
                            <div
                                className={buttonVariants({
                                    variant: "secondary",
                                    className: "!rounded-full text-xs border border-secondary/20 gap-0.5 h-7 !px-1.5"
                                })}
                            >
                                <EyeIcon size={14} className="inline-block" />
                            </div>
                        </>
                    ) : (
                        <>
                            <div
                                onClick={() => {
                                    handleUpdateViews(project._id as string)
                                }}
                                className={buttonVariants({
                                    variant: "secondary",
                                    className: "!rounded-full text-xs border border-secondary/20 gap-0.5 h-7 !px-1.5"
                                })}
                            >
                                <EyeIcon size={14} className="inline-block" />
                            </div>
                        </>
                    )}
                </div>
            </SignedIn>
            <SignedOut>
                <div className="absolute bottom-0 right-0 flex gap-1.5 p-3">
                    <div
                        onClick={() => {
                            handleUpdateViews(project._id as string)
                        }}
                        className={buttonVariants({
                            variant: "secondary",
                            className: "!rounded-full text-xs border border-secondary/20 gap-0.5 h-7 !px-1.5"
                        })}
                    >
                        <EyeIcon size={14} className="inline-block" />
                    </div>
                </div>
            </SignedOut>
        </Link>
    ))
}
