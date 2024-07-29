"use client"

import * as React from "react"
import { useUser } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { completeOnboarding } from "./_actions"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { z } from "zod"
import { api } from "@/convex/_generated/api"
import { useMutation } from "convex/react"

export default function OnboardingComponent() {
    const { user } = useUser()
    const router = useRouter()
    const create = useMutation(api.users.create)

    const [error, setError] = React.useState<string | null>(null)

    const handleSubmit = async (formData: FormData) => {
        if (!checkUrl(formData.get("portfolio") as string)) {
            return
        }

        if (!user) {
            setError("No logged in user")
        }

        await create({
            userId: user?.id!,
            email: user?.emailAddresses[0].emailAddress!,
            username: user?.username!,
            profileImg: user?.imageUrl!,
            portfolio: formData.get("portfolio") as string,
            xSocial: formData.get("xSocial") as string
        })
        await completeOnboarding()
        await user?.reload()
        router.push("/")
    }

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

    return (
        <div className="h-screen flex items-center justify-center">
            <Card>
                <CardHeader className="text-center">
                    <CardTitle>Onboarding</CardTitle>
                    <CardDescription>Let's get started by setting up your profile</CardDescription>
                </CardHeader>
                <CardContent>
                    <form action={handleSubmit}>
                        <div className="space-y-4">
                            <div>
                                <Label> Portfolio </Label>
                                <p className="text-xs block text-muted-foreground max-w-xs pb-2">
                                    Enter the URL of your portfolio or personal website (optional)
                                </p>
                                <Input type="text" name="portfolio" placeholder="https://swajp.me" />
                            </div>

                            <div>
                                <Label>Account on X</Label>
                                <p className="text-xs block text-muted-foreground max-w-xs pb-2">
                                    Enter your account on X (optional)
                                </p>
                                <Input name="xSocial" placeholder="https://x.com/swajp" type="text" />
                            </div>
                        </div>
                        {error && <p className="text-red-500 text-xs py-2">{error}</p>}
                        <div className="py-4">
                            <Button type="submit" className="w-full rounded-full">
                                Submit
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
