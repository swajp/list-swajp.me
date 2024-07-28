import Link from "next/link"
import { buttonVariants } from "./ui/button"

export default function Hero() {
    return (
        <>
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
        </>
    )
}
