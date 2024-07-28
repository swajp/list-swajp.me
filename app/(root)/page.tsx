import { Button, buttonVariants } from "@/components/ui/button"
import { projects } from "@/data"
import Link from "next/link"
import Image from "next/image"
import Icon from "@/components/icon"
import Hero from "@/components/hero"
import List from "@/components/list"
import Categories from "@/components/categories"

export interface Category {
    name: string
    icon?: React.ReactNode
}
export default function HomePage({ searchParams = {} }: { searchParams?: { category?: string | undefined } }) {
    const categories: Category[] = [
        {
            name: "Vercel",
            icon: <Icon.Vercel />
        },
        {
            name: "Auth0",
            icon: <Icon.Auth0 />
        },
        {
            name: "Apple",
            icon: <Icon.Apple />
        },
        {
            name: "Spotify",
            icon: <Icon.Spotify />
        },
        {
            name: "Meta",
            icon: <Icon.Meta />
        }
    ]

    return (
        <div>
            <Hero />
            <Categories categories={categories} projects={projects} searchParams={searchParams} />
            <List projects={projects} categories={categories} searchParams={searchParams} />
        </div>
    )
}
