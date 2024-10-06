"use client"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { api } from "@/convex/_generated/api"
import { Doc, Id } from "@/convex/_generated/dataModel"
import { useMutation } from "convex/react"
import { useState } from "react"
import { toast } from "sonner"

export default function PortfolioEdit(portfolio: Doc<"portfolios">) {
    const update = useMutation(api.portfolios.edit)

    const [isLoading, setIsLoading] = useState(false)

    const [formData, setFormData] = useState(() => ({
        name: portfolio.name,
        url: portfolio.url,
        img: portfolio.img || "",
        published: portfolio.published
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
                portfolioId: portfolio._id as Id<"portfolios">,
                ...formData
            })

            await toast.promise(promise, {
                loading: "Editing...",
                success: "Successfully edited!",
                error: "Failed while editing..."
            })
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
