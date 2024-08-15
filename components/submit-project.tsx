"use client"

import { api } from "@/convex/_generated/api"
import { useMutation } from "convex/react"
import { Button } from "./ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import React from "react"
import { useUser } from "@clerk/nextjs"
import { portfolioSubmited } from "@/lib/actions"
import { toast } from "sonner"
import Image from "next/image"
import Link from "next/link"

export default function SubmitProject({ children }: { children: React.ReactNode }) {
    const [name, setName] = React.useState<string | null>(null)
    const [url, setUrl] = React.useState<string | null>(null)
    const [description, setDescription] = React.useState<string | null>(null)
    const [category, setCategory] = React.useState<string | null>(null)

    const [submited, setSubmited] = React.useState(false)

    const create = useMutation(api.projects.create)
    const { user } = useUser()

    const [isSubmitting, setIsSubmitting] = React.useState(false)

    function checkUrl(url: string) {
        if (!url) {
            return true
        }
        const pattern =
            /(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?\/[a-zA-Z0-9]{2,}|((https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?)|(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})?/g

        if (pattern.test(url)) {
            return true
        } else {
            toast.error("Invalid URL")
            return false
        }
    }

    const handleSubmit = () => {
        if (!name || !url || !description || !category) {
            toast.error("Please fill out all fields")
            return
        }

        if (!user) {
            toast.error("You need to be logged in to submit a priject")
            return
        }

        if (!checkUrl(url)) {
            return
        }

        const promise = create({
            name,
            url,
            description,
            category
        })
            .then(() => portfolioSubmited(user?.emailAddresses[0].emailAddress!, name, url))
            .then(() => {
                setSubmited(true)
                setName(null)
                setUrl(null)
                setDescription(null)
                setCategory(null)
            })

        toast.promise(promise, {
            loading: "Submitting your project...",
            success: "Project submitted. Wait for approval",
            error: "Failed to submit your project"
        })

        setIsSubmitting(true)

        promise.finally(() => {
            setIsSubmitting(false)
        })
    }

    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="max-w-sm ">
                {!submited ? (
                    <>
                        <div className="text-center">
                            <DialogTitle className="text-xl font-medium mt-2">Submit my project</DialogTitle>
                            <DialogDescription>
                                Get more users by submitting your project to the community. We will review it and
                                publish it.
                            </DialogDescription>
                        </div>
                        <form action={handleSubmit}>
                            <div className="flex flex-col gap-2 items-center justify-center">
                                <div className="space-y-4 w-full">
                                    <div>
                                        <Label> Name </Label>
                                        <Input
                                            value={name || ""}
                                            onChange={e => setName(e.target.value)}
                                            disabled={isSubmitting}
                                            type="text"
                                            name="name"
                                            placeholder="Next JS"
                                        />
                                    </div>

                                    <div>
                                        <Label>URL</Label>

                                        <Input
                                            value={url || ""}
                                            onChange={e => setUrl(e.target.value)}
                                            disabled={isSubmitting}
                                            type="text"
                                            name="url"
                                            placeholder="https://nextjs.org"
                                        />
                                    </div>
                                    <div>
                                        <Label>Description</Label>
                                        <p className="text-xs text-muted-foreground mb-1">
                                            Describe your project in a few words. What does it do? What is it for? What
                                            makes it special?
                                        </p>

                                        <Input
                                            value={description || ""}
                                            onChange={e => setDescription(e.target.value)}
                                            disabled={isSubmitting}
                                            type="text"
                                            name="description"
                                        />
                                    </div>
                                    <div>
                                        <Label>Category</Label>
                                        <p className="text-xs text-muted-foreground mb-1">
                                            Which category does your project belong to?
                                        </p>

                                        <Input
                                            value={category || ""}
                                            onChange={e => setCategory(e.target.value)}
                                            disabled={isSubmitting}
                                            type="text"
                                            name="category"
                                        />
                                    </div>
                                </div>
                                <div className="py-4 w-full">
                                    <Button disabled={isSubmitting} type="submit" className="w-full rounded-full">
                                        Submit
                                    </Button>
                                </div>
                            </div>
                        </form>
                    </>
                ) : (
                    <div>
                        <Image
                            src={"/submited.gif"}
                            alt="submited"
                            width={504}
                            height={304}
                            className="rounded-xl border my-4"
                        />
                        <div className="text-center">
                            <DialogTitle className="text-xl font-medium mt-2">Project submitted</DialogTitle>
                            <DialogDescription>
                                Your project has been submitted. We will review it and publish it. Meanwhile, you can
                                give us a{" "}
                                <Link
                                    className="text-primary underline"
                                    href={"https://github.com/swajp/list-swajp.me"}
                                >
                                    star
                                </Link>
                            </DialogDescription>
                        </div>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    )
}
