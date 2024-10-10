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
    args: {
        published: v.boolean()
    },
    handler: async (ctx, args) => {
        if (args.published) {
            const portfolios = await ctx.db
                .query("portfolios")
                .filter(q => q.eq(q.field("published"), true))
                .order("desc")
                .collect()

            if (!portfolios || portfolios.length === 0) {
                return []
            }

            const users = await ctx.db.query("users").collect()

            return portfolios.map(portfolio => {
                const user = users.find(u => u.userId === portfolio.owner)

                return {
                    ...portfolio,
                    user: user
                }
            })
        } else {
            const portfolios = await ctx.db.query("portfolios").order("desc").collect()

            //TO-DO: typescript walkaround - NEEDS TO BE FIXED
            return portfolios.map(project => ({
                ...project,
                user: null
            }))
        }
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

        const newUpvotes: { userId: string; portfolioId: string }[] = Array.isArray(portfolio.newUpvotes) ? portfolio.newUpvotes : []
        const userUpvoteIndex = newUpvotes.findIndex(newUpvote => newUpvote.userId === identity.subject)

        if (userUpvoteIndex !== -1) {
            // User has already upvoted, so remove the upvote
            newUpvotes.splice(userUpvoteIndex, 1)
        } else {
            // User has not upvoted, so add the upvote
            newUpvotes.push({ userId: identity.subject, portfolioId: args.portfolioId })
        }

        await ctx.db.patch(portfolio._id, {
            newUpvotes: newUpvotes
        })
    }
})

// ADMIN SECTION

export const publish = mutation({
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

        //tohlr fungovt nebude
        if (portfolio.owner !== process.env.ADMIN_USER_ID) {
            throw new Error("Unauthorized")
        }

        await ctx.db.patch(portfolio._id, {
            published: true
        })
    }
})

export const get = query({
    args: { portfolioId: v.id("portfolios") },
    handler: async (ctx, args) => {
        const portfolio = await ctx.db
            .query("portfolios")
            .filter(q => q.eq(q.field("_id"), args.portfolioId))
            .first()

        if (!portfolio) {
            throw new Error("Project not found")
        }

        return portfolio
    }
})

export const edit = mutation({
    args: {
        portfolioId: v.id("portfolios"),
        name: v.string(),
        url: v.string(),
        published: v.boolean(),
        img: v.optional(v.string())
    },
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

        await ctx.db.patch(portfolio._id, {
            name: args.name,
            url: args.url,
            published: args.published,
            img: args.img ?? portfolio.img
        })
    }
})
