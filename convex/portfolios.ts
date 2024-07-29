import { v } from "convex/values"

import { mutation, query } from "./_generated/server"

export const create = mutation({
    args: {
        userId: v.string(),
        name: v.string(),
        url: v.string()
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity()

        if (identity === null) {
            throw new Error("No logged in user")
        }

        const portfolio = await ctx.db.insert("portfolios", {
            owner: args.userId,
            name: args.name,
            url: args.url,
            upvotes: 0,
            published: false
        })

        return portfolio
    }
})

export const collection = query({
    handler: async ctx => {
        const stories = await ctx.db
            .query("portfolios")
            .filter(q => q.eq(q.field("published"), true))
            .order("desc")
            .collect()

        return stories
    }
})
