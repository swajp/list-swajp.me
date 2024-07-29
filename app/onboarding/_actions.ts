"use server"

import { auth, clerkClient } from "@clerk/nextjs/server"

export const completeOnboarding = async () => {
    const { userId } = auth()

    if (!userId) {
        return { message: "No Logged In User" }
    }

    try {
        await clerkClient().users.updateUser(userId, {
            publicMetadata: {
                onboardingComplete: true
            }
        })
        return { message: "User metadata Updated" }
    } catch (e) {
        console.log("error", e)
        return { message: "Error Updating User Metadata" }
    }
}
