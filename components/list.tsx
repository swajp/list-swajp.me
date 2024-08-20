import Image from "next/image"
import Link from "next/link"
import { buttonVariants } from "./ui/button"
import { Project } from "@/data"
import { Category } from "@/app/(root)/page"
import ViewOtherProjects from "./view-other-projects"

interface ListProps {
    projects: Project[]
    categories: Category[]
    searchParams: { category?: string }
}

export default function List({ projects, categories, searchParams }: ListProps) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 py-8">
            {projects
                .filter(
                    project =>
                        !searchParams ||
                        searchParams.category === undefined ||
                        project.category === searchParams.category
                )
                .map(project => (
                    <Link target="_blank" href={project.url} key={project.name} className="relative border rounded-lg">
                        <Image
                            className="rounded-lg"
                            quality={100}
                            src={project.img}
                            alt={project.name}
                            width={453}
                            height={254}
                        />
                        <div className="absolute bottom-0 left-0 right-0  p-3">
                            <div
                                className={buttonVariants({
                                    variant: "default",
                                    className: "!rounded-full text-xs border border-secondary/20 gap-0.5 h-7 !px-2"
                                })}
                            >
                                {project.name}
                            </div>
                        </div>
                        <div className="absolute bottom-0 right-0  p-3">
                            <div
                                className={buttonVariants({
                                    variant: "default",
                                    className: "!rounded-full text-xs border border-secondary/20 gap-0.5 h-7 !px-3"
                                })}
                            >
                                {(categories.find(category => category.name === project.category)
                                    ?.icon as React.ReactNode) ?? null}

                                {project.category}
                            </div>
                        </div>
                    </Link>
                ))}
            <ViewOtherProjects />
        </div>
    )
}
