"use client"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { api } from "@/convex/_generated/api"
import { Doc, Id } from "@/convex/_generated/dataModel"
import { informOwnerPublished } from "@/lib/actions"
import { useMutation, useQuery } from "convex/react"
import { useState } from "react"
import { toast } from "sonner"

export default function ProjectEdit(project: Doc<"projects">) {
    const update = useMutation(api.projects.edit)

    const owner = useQuery(api.users.get, { userId: project.owner }) as Doc<"users">

    const [isLoading, setIsLoading] = useState(false)

    const [formData, setFormData] = useState(() => ({
        name: project.name,
        url: project.url,
        img: project.img || "",
        description: project.description || "",
        category: project.category || "",
        published: project.published,
        featured: project.featured || false
    }))

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target
        const inputValue = type === "checkbox" ? (e.target as HTMLInputElement).checked : value

        setFormData(prev => ({
            ...prev,
            [name]: inputValue
        }))
    }

    const handleCheckboxChange = (name: string, checked: boolean) => {
        setFormData(prev => ({
            ...prev,
            [name]: checked
        }))
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            const promise = update({
                projectId: project._id as Id<"projects">,
                ...formData
            })

            await toast.promise(promise, {
                loading: "Editing...",
                success: "Successfully edited!",
                error: "Failed while editing..."
            })

            if (formData.published) {
                await informOwnerPublished(owner.email, "Project")
            }
        } catch (error) {
            console.error("Editing failed:", error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <Input type="text" name="name" value={formData.name} onChange={handleChange} required />
                </div>
                <div>
                    <label>URL:</label>
                    <Input type="url" name="url" value={formData.url} onChange={handleChange} required />
                </div>
                <div>
                    <label>Image URL:</label>
                    <Input type="text" name="img" value={formData.img} onChange={handleChange} />
                </div>
                <div>
                    <label>Description:</label>
                    <Textarea name="description" value={formData.description} onChange={handleChange} required />
                </div>
                <div>
                    <label>Category:</label>
                    <Input type="text" name="category" value={formData.category} onChange={handleChange} required />
                </div>
                <div>
                    <label>Featured:</label>
                    <Checkbox
                        name="featured"
                        checked={formData.featured}
                        onCheckedChange={checked => handleCheckboxChange("featured", checked as boolean)}
                    />
                </div>
                <div>
                    <label>Published:</label>
                    <Checkbox
                        name="published"
                        checked={formData.published}
                        onCheckedChange={checked => handleCheckboxChange("published", checked as boolean)}
                    />
                </div>
                <Button disabled={isLoading} type="submit">
                    {isLoading ? "Loading..." : "Save Changes"}
                </Button>
            </form>
        </div>
    )
}
