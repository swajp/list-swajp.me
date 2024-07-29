import { v } from "convex/values"

import { mutation, query } from "./_generated/server"

export const create = mutation({
    args: {
        userId: v.string(),
        email: v.string(),
        username: v.string(),
        profileImg: v.string(),
        portfolio: v.optional(v.string()),
        xSocial: v.optional(v.string())
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity()

        if (identity === null) {
            throw new Error("No logged in user")
        }

        const user = await ctx.db.insert("users", {
            userId: args.userId,
            email: args.email,
            username: args.username,
            profileImg: args.profileImg,
            portfolio: args.portfolio,
            xSocial: args.xSocial
        })
    }
})
