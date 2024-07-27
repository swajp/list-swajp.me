import { buttonVariants } from "@/components/ui/button"
import { projects } from "@/data"
import Link from "next/link"
import Image from "next/image"

export default function HomePage() {
    interface Category {
        name: string
        svg?: React.ReactNode
    }

    const categories: Category[] = [
        {
            name: "Vercel",
            svg: (
                <svg data-testid="geist-icon" height="12" strokeLinejoin="round" viewBox="0 0 16 16" width="12">
                    <path fillRule="evenodd" clipRule="evenodd" d="M8 1L16 15H0L8 1Z" fill="currentColor"></path>
                </svg>
            )
        },
        {
            name: "Auth0",
            svg: (
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_17_58)">
                        <path
                            d="M9.18944 9.70762L7.97107 6L11.1601 3.70875H7.21882L6.00063 0H9.94413L11.164 3.70875C11.8703 5.859 11.1419 8.30625 9.18963 9.70744L9.18944 9.70762ZM2.81013 9.70762L5.99932 12L9.18963 9.70744L6.00063 7.41638L2.81013 9.70762ZM0.838382 3.70763C0.0928824 5.97638 0.958382 8.37956 2.80713 9.70894V9.70762L4.02757 6L0.838382 3.70763L4.78076 3.70894L5.99932 0H2.05694L0.838382 3.70763Z"
                            fill="#EB5424"
                        />
                    </g>
                    <defs>
                        <clipPath id="clip0_17_58">
                            <rect width="12" height="12" fill="white" />
                        </clipPath>
                    </defs>
                </svg>
            )
        }
    ]

    return (
        <div>
            <div className="flex flex-col gap-4 pt-12 pb-8 max-w-lg">
                <h1 className="text-3xl font-medium">
                    It has never been easier to find the right projects or designs by inspiring sucessful people.
                </h1>
                <Link
                    target="_blank"
                    className={buttonVariants({ variant: "default", className: "!rounded-full w-fit h-8 px-2 " })}
                    href="https://twitter.com/intent/tweet"
                >
                    Tweet about us
                </Link>
            </div>
            {/*<div className="flex gap-4">
                {categories.map(category => (
                    <Button variant={"secondary"} className="rounded-full">
                        {(category.svg as React.ReactNode) ?? null}
                        {category.name}
                    </Button>
                ))}
            </div>
            */}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 py-8">
                {projects.map(project => (
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
                                    className: "!rounded-full text-xs border border-secondary/20 gap-0.5 h-7 px-2"
                                })}
                            >
                                {project.name}
                            </div>
                        </div>
                        <div className="absolute bottom-0 right-0  p-3">
                            <div
                                className={buttonVariants({
                                    variant: "default",
                                    className: "!rounded-full text-xs border border-secondary/20 gap-0.5 h-7 px-2"
                                })}
                            >
                                {(categories.find(category => category.name === project.category)
                                    ?.svg as React.ReactNode) ?? null}

                                {project.category}
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}
