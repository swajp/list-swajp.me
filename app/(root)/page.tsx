import { Button, buttonVariants } from "@/components/ui/button"
import { projects } from "@/data"
import Link from "next/link"
import Image from "next/image"

export default function HomePage({ searchParams }: { searchParams?: { [key: string]: string | undefined } }) {
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
        },
        {
            name: "Apple",
            svg: (
                <svg
                    className="mr-0.5"
                    width="9"
                    height="12"
                    viewBox="0 0 9 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M8.71364 4.0908C8.64951 4.1448 7.51732 4.8372 7.51732 6.3768C7.51732 8.1576 8.95798 8.7876 9.00111 8.8032C8.99447 8.8416 8.77224 9.666 8.24152 10.506C7.7683 11.2452 7.27408 11.9832 6.52224 11.9832C5.77039 11.9832 5.5769 11.5092 4.70897 11.5092C3.86314 11.5092 3.56241 11.9988 2.87469 11.9988C2.18698 11.9988 1.70713 11.3148 1.15541 10.4748C0.516339 9.4884 0 7.956 0 6.5016C0 4.1688 1.39754 2.9316 2.77297 2.9316C3.50381 2.9316 4.11302 3.4524 4.57187 3.4524C5.0086 3.4524 5.68968 2.9004 6.52113 2.9004C6.83624 2.9004 7.96843 2.9316 8.71364 4.0908ZM6.12641 1.9128C6.47027 1.47 6.71351 0.8556 6.71351 0.2412C6.71351 0.156 6.70688 0.0696 6.69251 0C6.13305 0.0228 5.46744 0.4044 5.06609 0.9096C4.75098 1.2984 4.45688 1.9128 4.45688 2.5356C4.45688 2.6292 4.47125 2.7228 4.47789 2.7528C4.51327 2.76 4.57076 2.7684 4.62826 2.7684C5.13022 2.7684 5.76155 2.4036 6.12641 1.9128Z"
                        fill="white"
                    />
                </svg>
            )
        },
        {
            name: "Spotify",
            svg: (
                <svg
                    className="mr-0.5"
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <g clip-path="url(#clip0_23_8)">
                        <path
                            d="M6 0.1875C2.6879 0.1875 0 2.79141 0 6C0 9.20859 2.6879 11.8125 6 11.8125C9.3121 11.8125 12 9.20859 12 6C12 2.79141 9.3121 0.1875 6 0.1875Z"
                            fill="#1ED760"
                        />
                        <path
                            d="M9.83739 5.4164C9.71158 5.4164 9.63416 5.38593 9.52529 5.32499C7.80271 4.3289 4.72287 4.08984 2.72932 4.6289C2.64223 4.65234 2.53335 4.68984 2.41723 4.68984C2.09787 4.68984 1.85352 4.44843 1.85352 4.13671C1.85352 3.81796 2.05674 3.63749 2.27448 3.57656C3.1261 3.33515 4.07932 3.22031 5.11723 3.22031C6.88335 3.22031 8.73416 3.57656 10.0866 4.34062C10.2753 4.44609 10.3987 4.5914 10.3987 4.87031C10.3987 5.18906 10.1325 5.4164 9.83739 5.4164ZM9.08739 7.20234C8.96158 7.20234 8.8769 7.14843 8.78981 7.1039C7.27771 6.23671 5.02287 5.88749 3.01723 6.41484C2.9011 6.44531 2.83819 6.47578 2.72932 6.47578C2.47045 6.47578 2.25997 6.27187 2.25997 6.02109C2.25997 5.77031 2.38577 5.6039 2.63497 5.53593C3.30755 5.35312 3.99464 5.21718 5.0011 5.21718C6.57126 5.21718 8.08819 5.59453 9.28335 6.28359C9.47932 6.39609 9.55674 6.5414 9.55674 6.74531C9.55432 6.99843 9.3511 7.20234 9.08739 7.20234ZM8.43658 8.73984C8.33497 8.73984 8.27206 8.70937 8.17771 8.65546C6.66803 7.77421 4.91158 7.73671 3.1769 8.08124C3.08255 8.10468 2.95916 8.14218 2.889 8.14218C2.65432 8.14218 2.50674 7.96171 2.50674 7.77187C2.50674 7.53046 2.65432 7.41562 2.83577 7.37812C4.81723 6.9539 6.84223 6.9914 8.56965 7.99218C8.71723 8.08359 8.80432 8.16562 8.80432 8.3789C8.80432 8.59218 8.63255 8.73984 8.43658 8.73984Z"
                            fill="black"
                        />
                    </g>
                    <defs>
                        <clipPath id="clip0_23_8">
                            <rect width="12" height="12" fill="white" />
                        </clipPath>
                    </defs>
                </svg>
            )
        }
    ]

    const filterCategories: Category[] = [
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
        },
        {
            name: "Apple",
            svg: (
                <svg
                    className="mr-0.5"
                    width="9"
                    height="12"
                    viewBox="0 0 9 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M8.71364 4.0908C8.64951 4.1448 7.51732 4.8372 7.51732 6.3768C7.51732 8.1576 8.95798 8.7876 9.00111 8.8032C8.99447 8.8416 8.77224 9.666 8.24152 10.506C7.7683 11.2452 7.27408 11.9832 6.52224 11.9832C5.77039 11.9832 5.5769 11.5092 4.70897 11.5092C3.86314 11.5092 3.56241 11.9988 2.87469 11.9988C2.18698 11.9988 1.70713 11.3148 1.15541 10.4748C0.516339 9.4884 0 7.956 0 6.5016C0 4.1688 1.39754 2.9316 2.77297 2.9316C3.50381 2.9316 4.11302 3.4524 4.57187 3.4524C5.0086 3.4524 5.68968 2.9004 6.52113 2.9004C6.83624 2.9004 7.96843 2.9316 8.71364 4.0908ZM6.12641 1.9128C6.47027 1.47 6.71351 0.8556 6.71351 0.2412C6.71351 0.156 6.70688 0.0696 6.69251 0C6.13305 0.0228 5.46744 0.4044 5.06609 0.9096C4.75098 1.2984 4.45688 1.9128 4.45688 2.5356C4.45688 2.6292 4.47125 2.7228 4.47789 2.7528C4.51327 2.76 4.57076 2.7684 4.62826 2.7684C5.13022 2.7684 5.76155 2.4036 6.12641 1.9128Z"
                        fill="black"
                    />
                </svg>
            )
        },
        {
            name: "Spotify",
            svg: (
                <svg
                    className="mr-0.5"
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <g clip-path="url(#clip0_23_8)">
                        <path
                            d="M6 0.1875C2.6879 0.1875 0 2.79141 0 6C0 9.20859 2.6879 11.8125 6 11.8125C9.3121 11.8125 12 9.20859 12 6C12 2.79141 9.3121 0.1875 6 0.1875Z"
                            fill="#1ED760"
                        />
                        <path
                            d="M9.83739 5.4164C9.71158 5.4164 9.63416 5.38593 9.52529 5.32499C7.80271 4.3289 4.72287 4.08984 2.72932 4.6289C2.64223 4.65234 2.53335 4.68984 2.41723 4.68984C2.09787 4.68984 1.85352 4.44843 1.85352 4.13671C1.85352 3.81796 2.05674 3.63749 2.27448 3.57656C3.1261 3.33515 4.07932 3.22031 5.11723 3.22031C6.88335 3.22031 8.73416 3.57656 10.0866 4.34062C10.2753 4.44609 10.3987 4.5914 10.3987 4.87031C10.3987 5.18906 10.1325 5.4164 9.83739 5.4164ZM9.08739 7.20234C8.96158 7.20234 8.8769 7.14843 8.78981 7.1039C7.27771 6.23671 5.02287 5.88749 3.01723 6.41484C2.9011 6.44531 2.83819 6.47578 2.72932 6.47578C2.47045 6.47578 2.25997 6.27187 2.25997 6.02109C2.25997 5.77031 2.38577 5.6039 2.63497 5.53593C3.30755 5.35312 3.99464 5.21718 5.0011 5.21718C6.57126 5.21718 8.08819 5.59453 9.28335 6.28359C9.47932 6.39609 9.55674 6.5414 9.55674 6.74531C9.55432 6.99843 9.3511 7.20234 9.08739 7.20234ZM8.43658 8.73984C8.33497 8.73984 8.27206 8.70937 8.17771 8.65546C6.66803 7.77421 4.91158 7.73671 3.1769 8.08124C3.08255 8.10468 2.95916 8.14218 2.889 8.14218C2.65432 8.14218 2.50674 7.96171 2.50674 7.77187C2.50674 7.53046 2.65432 7.41562 2.83577 7.37812C4.81723 6.9539 6.84223 6.9914 8.56965 7.99218C8.71723 8.08359 8.80432 8.16562 8.80432 8.3789C8.80432 8.59218 8.63255 8.73984 8.43658 8.73984Z"
                            fill="black"
                        />
                    </g>
                    <defs>
                        <clipPath id="clip0_23_8">
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
                {filterCategories.map(category => (
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
                            className: "!rounded-full gap-1 px-1.5",
                            variant: "ghost"
                        })}
                    >
                        {(category.svg as React.ReactNode) ?? null}
                        {category.name}
                        <span className="text-muted-foreground">
                            ({projects.filter(project => project.category === category.name).length})
                        </span>
                    </Link>
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 py-8">
                {projects
                    .filter(
                        project =>
                            !searchParams ||
                            searchParams.category === undefined ||
                            project.category === searchParams.category
                    )
                    .map(project => (
                        <Link
                            target="_blank"
                            href={project.url}
                            key={project.name}
                            className="relative border rounded-lg"
                        >
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
