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
    })
})
