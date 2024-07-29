"use client"

import { api } from "@/convex/_generated/api"
import { useMutation } from "convex/react"
import { Button } from "./ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "./ui/dialog"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import React from "react"
import { useUser } from "@clerk/nextjs"

export default function SubmitDialog({ children }: { children: React.ReactNode }) {
    const [name, setName] = React.useState<string | null>(null)
    const [url, setUrl] = React.useState<string | null>(null)

    const create = useMutation(api.portfolios.create)
    const { user } = useUser()

    const [error, setError] = React.useState<string | null>(null)
    const [success, setSuccess] = React.useState<string | null>(null)
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
            setError("Invalid URL")
        }
    }

    const handleSubmit = async () => {
        if (!name || !url) {
            setError("Please fill out all fields")
            return
        }

        if (!user) {
            setError("No logged in user")
        }

        if (!checkUrl(url)) {
            return
        }
        setIsSubmitting(true)

        await create({
            userId: user?.id!,
            name,
            url
        })
        setIsSubmitting(false)
        setError(null)
        setSuccess("Portfolio submitted. Wait for approval")

        setName(null)
        setUrl(null)
    }

    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="max-w-sm ">
                <DialogHeader className="text-xl font-medium mx-auto">Submit my portfolio</DialogHeader>
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
                                    placeholder="swajp"
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
                                    placeholder="https://swajp.me"
                                />
                            </div>
                        </div>
                        {error && <p className="text-red-500 text-xs py-2">{error}</p>}
                        {success && <p className="text-green-500 text-xs py-2">{success}</p>}
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
