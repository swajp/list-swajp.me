"use client"

import Image from "next/image"
import Link from "next/link"
import { buttonVariants } from "./ui/button"
import { Project } from "@/data"
import { useMutation, useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel"
import SubmitActionCard from "./submit-action-card"
import SubmitProject from "./submit-project"
import { SignedIn, SignedOut, SignInButton, useUser } from "@clerk/nextjs"
import { Skeleton } from "./ui/skeleton"
import { useState } from "react"
import { toast } from "sonner"
import { AlignLeftIcon, ArrowUp, EyeIcon } from "lucide-react"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ListProps {
    projects: Project[]
}

const RATE_LIMIT_INTERVAL = 10000

export default function ProjectsList() {
    const projects = useQuery(api.projects.collection, {
        published: true
    })

    const [lastUpvoteTime, setLastUpvoteTime] = useState(0)
    const upvote = useMutation(api.projects.upvote)

    const [sortOption, setSortOption] = useState("views")

    const updateViews = useMutation(api.projects.updateViews)

    const handleUpvote = async (projectId: Id<"projects">) => {
        const currentTime = Date.now()

        if (currentTime - lastUpvoteTime < RATE_LIMIT_INTERVAL) {
            toast.error("Don't spam me like that 😡")
            return
        }

        setLastUpvoteTime(currentTime)
        await upvote({ projectId })

        toast.success("Upvoted successfully! 🎉")
    }

    const { user } = useUser()

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

    const sortedProjects = [...projects].sort((a, b) => {
        switch (sortOption) {
            case "views":
                return (b.views ?? 0) - (a.views ?? 0)
            case "newest":
                return new Date(b._creationTime).getTime() - new Date(a._creationTime).getTime()
            case "oldest":
                return new Date(a._creationTime).getTime() - new Date(b._creationTime).getTime()
            case "mostUpvoted":
                return (b.newUpvotes?.length ?? 0) - (a.newUpvotes?.length ?? 0)
            case "leastUpvoted":
                return (a.newUpvotes?.length ?? 0) - (b.newUpvotes?.length ?? 0)
            default:
                return 0
        }
    })

    return (
        <>
            <div className="flex justify-end">
                <Select onValueChange={value => setSortOption(value)}>
                    <SelectTrigger className="w-fit">
                        <AlignLeftIcon size={16} className="inline-block mr-2" />
                        <SelectValue placeholder="Views" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value="views">Views</SelectItem>
                            <SelectItem value="newest">Newest</SelectItem>
                            <SelectItem value="oldest">Oldest</SelectItem>
                            <SelectItem value="mostUpvoted">Most upvoted</SelectItem>
                            <SelectItem value="leastUpvoted">Least upvoted</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 py-8">
                {sortedProjects.map(project => (
                    <Link
                        onClick={() => {
                            updateViews({ projectId: project._id as Id<"projects"> })
                        }}
                        target="_blank"
                        href={project.url}
                        key={project.name}
                        className="relative border rounded-lg"
                    >
                        <Image
                            className="rounded-lg"
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
                                            onClick={e => {
                                                e.preventDefault()
                                                e.stopPropagation()
                                            }}
                                            className={buttonVariants({
                                                variant: "secondary",
                                                className: "!rounded-full text-xs border border-secondary/20 gap-0.5 h-7 !px-1.5"
                                            })}
                                        >
                                            <ArrowUp size={14} className="inline-block" />
                                            {project.newUpvotes?.length ?? 0}
                                        </div>
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
                                            onClick={e => {
                                                e.preventDefault()
                                                e.stopPropagation()
                                                handleUpvote(project._id as Id<"projects">)
                                            }}
                                            className={buttonVariants({
                                                variant: "secondary",
                                                className: "!rounded-full text-xs border border-secondary/20 gap-0.5 h-7 !px-1.5"
                                            })}
                                        >
                                            <ArrowUp size={14} className="inline-block" />
                                            {project.newUpvotes?.length ?? 0}
                                        </div>
                                        <div
                                            onClick={() => {
                                                updateViews({ projectId: project._id as Id<"projects"> })
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
                                <SignInButton mode="modal">
                                    <div
                                        onClick={e => {
                                            e.preventDefault()
                                        }}
                                        className={buttonVariants({
                                            variant: "secondary",
                                            className: "!rounded-full text-xs border border-secondary/20 gap-0.5 h-7 !px-1.5"
                                        })}
                                    >
                                        <ArrowUp size={14} className="inline-block" />
                                        {project.newUpvotes?.length ?? 0}
                                    </div>
                                </SignInButton>
                                <div
                                    onClick={() => {
                                        updateViews({ projectId: project._id as Id<"projects"> })
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
                ))}
                <SignedIn>
                    <SubmitProject>
                        <button className="outline-none">
                            <SubmitActionCard text="Submit my own project. 🚀" />
                        </button>
                    </SubmitProject>
                </SignedIn>
                <SignedOut>
                    <SignInButton mode="modal">
                        <button className="outline-none">
                            <SubmitActionCard text="Submit my own project. 🚀" />
                        </button>
                    </SignInButton>
                </SignedOut>
            </div>
        </>
    )
}
