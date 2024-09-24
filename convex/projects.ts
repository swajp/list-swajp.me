import { v } from "convex/values"

import { mutation, query } from "./_generated/server"

export const create = mutation({
    args: {
        name: v.string(),
        url: v.string(),
        description: v.string(),
        category: v.string()
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity()

        if (identity === null) {
            throw new Error("No logged in user")
        }

        const project = await ctx.db.insert("projects", {
            owner: identity.subject,
            name: args.name,
            url: args.url,
            description: args.description,
            category: args.category,
            upvotes: 0,
            newUpvotes: [],
            published: false,
            featured: false,
            views: 0
        })

        return project
    }
})

export const collection = query({
    handler: async ctx => {
        const projects = await ctx.db
            .query("projects")
            .filter(q => q.eq(q.field("published"), true))
            .order("desc")
            .collect()

        return projects
    }
})

export const collectionByUser = query({
    args: { userId: v.string() },
    handler: async (ctx, args) => {
        const projectsByUser = await ctx.db
            .query("projects")
            .filter(q => q.eq(q.field("owner"), args.userId))
            .order("desc")
            .collect()

        return projectsByUser
    }
})

export const remove = mutation({
    args: { projectId: v.id("projects") },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity()

        if (identity === null) {
            throw new Error("No logged in user")
        }

        const project = await ctx.db
            .query("projects")
            .filter(q => q.eq(q.field("_id"), args.projectId))
            .first()

        if (!project) {
            throw new Error("Project not found")
        }

        if (project.owner !== identity.subject) {
            throw new Error("Unauthorized")
        }

        await ctx.db.delete(project._id)
    }
})

export const updateViews = mutation({
    args: { projectId: v.id("projects") },
    handler: async (ctx, args) => {
        const project = await ctx.db
            .query("projects")
            .filter(q => q.eq(q.field("_id"), args.projectId))
            .first()

        if (!project) {
            throw new Error("Project not found")
        }

        await ctx.db.patch(project._id, {
            views: (project.views ?? 0) + 1
        })
    }
})

export const upvote = mutation({
    args: { projectId: v.id("projects") },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity()

        if (identity === null) {
            throw new Error("No logged in user")
        }

        const project = await ctx.db
            .query("projects")
            .filter(q => q.eq(q.field("_id"), args.projectId))
            .first()

        if (!project) {
            throw new Error("Project not found")
        }

        if (project.owner === identity.subject) {
            throw new Error("Cannot upvote own project")
        }

        const newUpvotes: { userId: string; projectId: string }[] = Array.isArray(project.newUpvotes) ? project.newUpvotes : []
        const userUpvoteIndex = newUpvotes.findIndex(newUpvote => newUpvote.userId === identity.subject)

        if (userUpvoteIndex !== -1) {
            newUpvotes.splice(userUpvoteIndex, 1)
        } else {
            newUpvotes.push({ userId: identity.subject, projectId: args.projectId })
        }

        await ctx.db.patch(project._id, {
            newUpvotes: newUpvotes
        })
    }
})
