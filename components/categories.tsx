import Link from "next/link"
import { buttonVariants } from "./ui/button"
import { Project } from "@/data"
import { Category } from "@/app/(root)/page"

interface CategoryProps {
    projects: Project[]
    searchParams: { category?: string }
    categories: Category[]
}

export default function Categories({ projects, searchParams, categories }: CategoryProps) {
    return (
        <div className="flex flex-wrap gap-3">
            <Link
                href={
                    searchParams
                        ? {
                              pathname: "/",
                              query: { category: undefined }
                          }
                        : "/"
                }
                className={buttonVariants({
                    className: "!rounded-full gap-1 px-3",
                    variant: "default"
                })}
            >
                Show all
            </Link>
            {categories.map(category => (
                <Link
                    href={
                        searchParams
                            ? {
                                  pathname: "/",
                                  query: { category: category.name }
                              }
                            : "/"
                    }
                    key={category.name}
                    className={buttonVariants({
                        className: `!rounded-full gap-1 px-1.5 ${
                            searchParams?.category === category.name ? "border" : ""
                        }`,
                        variant: "ghost"
                    })}
                >
                    {(category.icon as React.ReactNode) ?? null}
                    {category.name}
                    <span className="text-muted-foreground">
                        ({projects.filter(project => project.category === category.name).length})
                    </span>
                </Link>
            ))}
        </div>
    )
}
