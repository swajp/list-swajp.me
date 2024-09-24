import { defineSchema, defineTable } from "convex/server"
import { v } from "convex/values"

export default defineSchema({
    users: defineTable({
        userId: v.string(),
        email: v.string(),
        username: v.string(),
        profileImg: v.string(),
        portfolio: v.optional(v.string()),
        xSocial: v.optional(v.string())
    }),

    portfolios: defineTable({
        owner: v.string(),
        name: v.string(),
        url: v.string(),
        img: v.optional(v.string()),
        upvotes: v.optional(v.number()),
        newUpvotes: v.optional(
            v.array(
                v.object({
                    userId: v.string(),
                    portfolioId: v.string()
                })
            )
        ),
        published: v.boolean(),
        views: v.optional(v.number())
    }),

    projects: defineTable({
        owner: v.string(),
        name: v.string(),
        url: v.string(),
        description: v.string(),
        category: v.string(),
        img: v.optional(v.string()),
        upvotes: v.optional(v.number()),
        newUpvotes: v.optional(
            v.array(
                v.object({
                    userId: v.string(),
                    projectId: v.string()
                })
            )
        ),
        published: v.boolean(),
        featured: v.optional(v.boolean()),
        views: v.optional(v.number())
    })
})
