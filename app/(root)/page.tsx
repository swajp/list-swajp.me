import { Button, buttonVariants } from "@/components/ui/button"
import { projects } from "@/data"
import Link from "next/link"
import Image from "next/image"
import Icon from "@/components/icon"
import Hero from "@/components/hero"
import List from "@/components/list"
import Categories from "@/components/categories"
import CommunityList from "@/components/community-list"
import ProjectsList from "@/components/projects-list"

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
        },
        {
            name: "Google",
            icon: <Icon.Google />
        },
        {
            name: "Other"
        }
    ]

    return (
        <div>
            <Hero />
            <Categories categories={categories} projects={projects} searchParams={searchParams} />
            <List projects={projects} categories={categories} searchParams={searchParams} />
            <h1 className="text-3xl font-medium max-w-md">
                View submitted portfolios from our{" "}
                <Link href={"/community"} className="text-muted-foreground">
                    community
                </Link>
                .
            </h1>
            <CommunityList />
            <h1 className="text-3xl font-medium max-w-md">Projects submitted by our users 🚀</h1>
            <ProjectsList />
        </div>
    )
}
