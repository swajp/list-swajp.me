"use client"

import Image from "next/image"
import Link from "next/link"
import { buttonVariants } from "./ui/button"
import { Project } from "@/data"
import { useMutation, useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel"
import SubmitActionCard from "./submit-action-card"
import SubmitDialog from "./submit-dialog"
import { SignedIn, SignedOut, SignInButton, useUser } from "@clerk/nextjs"
import { Skeleton } from "./ui/skeleton"
import { ArrowUp, EyeIcon } from "lucide-react"
import { toast } from "sonner"
import { useState } from "react"

interface ListProps {
    projects: Project[]
}

const RATE_LIMIT_INTERVAL = 10000

export default function CommunityList() {
    const portfolios = useQuery(api.portfolios.collection, { published: true })

    const [lastUpvoteTime, setLastUpvoteTime] = useState(0)
    const upvote = useMutation(api.portfolios.upvote)

    const updateViews = useMutation(api.portfolios.updateViews)

    const handleUpvote = async (portfolioId: Id<"portfolios">) => {
        const currentTime = Date.now()

        if (currentTime - lastUpvoteTime < RATE_LIMIT_INTERVAL) {
            toast.error("Don't spam me like that 😡")
            return
        }

        setLastUpvoteTime(currentTime)
        await upvote({ portfolioId })

        toast.success("Upvoted successfully! 🎉")
    }

    const { user } = useUser()

    if (!portfolios) {
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
            {portfolios.map(portfolio => (
                <Link
                    onClick={() => {
                        updateViews({ portfolioId: portfolio._id as Id<"portfolios"> })
                    }}
                    target="_blank"
                    href={portfolio.url}
                    key={portfolio.name}
                    className="relative border rounded-lg"
                >
                    <Image className="rounded-lg" quality={100} src={`/community/${portfolio.img!}`} alt={portfolio.name} width={453} height={254} />

                    <div className="absolute top-0 left-0 right-0  p-3">
                        <div
                            className={buttonVariants({
                                variant: "default",
                                className: "!rounded-full text-xs border border-secondary/20 gap-0.5 h-7 !px-2"
                            })}
                        >
                            {portfolio.name}
                        </div>
                    </div>
                    {portfolio.user && (
                        <div className="absolute bottom-0 left-0 right-0  p-3">
                            <div
                                onClick={e => {
                                    e.preventDefault()
                                    e.stopPropagation()
                                }}
                                className="!rounded-full select-none text-xs gap-1.5 flex items-center font-medium h-7 px-2 bg-muted/70 w-fit "
                            >
                                {portfolio.user.profileImg ? (
                                    <Image
                                        src={portfolio.user.profileImg}
                                        alt={portfolio.user.username}
                                        width={20}
                                        height={20}
                                        className="rounded-full inline-block"
                                    />
                                ) : (
                                    <div className="rounded-full w-5 h-5 bg-primary/50"></div>
                                )}

                                {portfolio.user.username}
                            </div>
                        </div>
                    )}
                    <SignedIn>
                        <div className="absolute bottom-0 right-0 flex gap-1.5 p-3">
                            {portfolio.owner === user?.id ? (
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
                                        {portfolio.newUpvotes?.length ?? 0}
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
                                            handleUpvote(portfolio._id as Id<"portfolios">)
                                        }}
                                        className={buttonVariants({
                                            variant: "secondary",
                                            className: "!rounded-full text-xs border border-secondary/20 gap-0.5 h-7 !px-1.5"
                                        })}
                                    >
                                        <ArrowUp size={14} className="inline-block" />
                                        {portfolio.newUpvotes?.length ?? 0}
                                    </div>
                                    <div
                                        onClick={() => {
                                            updateViews({ portfolioId: portfolio._id as Id<"portfolios"> })
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
                                    {portfolio.newUpvotes?.length ?? 0}
                                </div>
                            </SignInButton>
                            <div
                                onClick={() => {
                                    updateViews({ portfolioId: portfolio._id as Id<"portfolios"> })
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
