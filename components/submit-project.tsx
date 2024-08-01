"use client"

import { api } from "@/convex/_generated/api"
import { useMutation } from "convex/react"
import { Button } from "./ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "./ui/dialog"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import React from "react"
import { useUser } from "@clerk/nextjs"
import { DialogTitle } from "@radix-ui/react-dialog"
import { portfolioSubmited } from "@/lib/actions"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

export default function SubmitProject({ children }: { children: React.ReactNode }) {
    const [name, setName] = React.useState<string | null>(null)
    const [url, setUrl] = React.useState<string | null>(null)
    const [description, setDescription] = React.useState<string | null>(null)
    const [category, setCategory] = React.useState<string | null>(null)

    const router = useRouter()

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

    const handleSubmit = async () => {
        if (!name || !url || !description || !category) {
            toast.error("Please fill out all fields")
            return
        }

        if (!user) {
            toast.error("You need to be logged in to submit a portfolio")
        }

        if (!checkUrl(url)) {
            return
        }
        setIsSubmitting(true)

        await create({
            userId: user?.id!,
            name,
            url,
            description,
            category
        })

        await portfolioSubmited(user?.emailAddresses[0].emailAddress!, name, url)
        setIsSubmitting(false)
        toast.success("Project submitted. Wait for approval")

        router.push("/profile")

        setName(null)
        setUrl(null)
    }

    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="max-w-sm ">
                <DialogTitle className="text-xl font-medium mx-auto">Submit my project</DialogTitle>
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
                                    Describe your project in a few words. What does it do? What is it for? What makes it
                                    special?
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
                        <div className="py-4">
                            <Button disabled={isSubmitting} type="submit" className="w-full rounded-full">
                                Submit
                            </Button>
                        </div>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}
