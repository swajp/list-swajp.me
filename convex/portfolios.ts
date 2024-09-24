import { v } from "convex/values"

import { mutation, query } from "./_generated/server"

export const create = mutation({
    args: {
        name: v.string(),
        url: v.string()
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity()

        if (identity === null) {
            throw new Error("No logged in user")
        }

        const portfolio = await ctx.db.insert("portfolios", {
            owner: identity.subject,
            name: args.name,
            url: args.url,
            upvotes: 0,
            newUpvotes: [],
            published: false,
            views: 0
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

        if (portfolio.owner !== identity.subject) {
            throw new Error("Unauthorized")
        }

        await ctx.db.delete(portfolio._id)
    }
})

export const updateViews = mutation({
    args: { portfolioId: v.id("portfolios") },
    handler: async (ctx, args) => {
        const portfolio = await ctx.db
            .query("portfolios")
            .filter(q => q.eq(q.field("_id"), args.portfolioId))
            .first()

        if (!portfolio) {
            throw new Error("Portfolio not found")
        }

        await ctx.db.patch(portfolio._id, {
            views: (portfolio.views ?? 0) + 1
        })
    }
})

export const upvote = mutation({
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

        if (portfolio.owner === identity.subject) {
            throw new Error("Cannot upvote own portfolio")
        }

        const upvotes: { userId: string; portfolioId: string }[] = Array.isArray(portfolio.upvotes) ? portfolio.upvotes : []
        const userUpvoteIndex = upvotes.findIndex(upvote => upvote.userId === identity.subject)

        if (userUpvoteIndex !== -1) {
            // User has already upvoted, so remove the upvote
            upvotes.splice(userUpvoteIndex, 1)
        } else {
            // User has not upvoted, so add the upvote
            upvotes.push({ userId: identity.subject, portfolioId: args.portfolioId })
        }

        await ctx.db.patch(portfolio._id, {
            newUpvotes: upvotes
        })
    }
})
