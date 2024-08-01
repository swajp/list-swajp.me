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
        const portfolios = await ctx.db
            .query("portfolios")
            .filter(q => q.eq(q.field("published"), true))
            .order("desc")
            .collect()

        return portfolios
    }
})

export const collectionByUser = query({
    args: { userId: v.string() },
    handler: async (ctx, args) => {
        const portfoliosByUser = await ctx.db
            .query("portfolios")
            .filter(q => q.eq(q.field("owner"), args.userId))
            .order("desc")
            .collect()

        return portfoliosByUser
    }
})

export const remove = mutation({
    args: { portfolioId: v.id("portfolios") },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity()

        if (identity === null) {
            throw new Error("No logged in user")
        }

        const portfolio = await ctx.db
            .query("portfolios")
            .filter(q => q.eq(q.field("_id"), args.portfolioId))
            .first()

        if (!portfolio) {
            throw new Error("Portfolio not found")
        }

        await ctx.db.delete(portfolio._id)
    }
})
