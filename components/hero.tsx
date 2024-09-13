import Link from "next/link"
import { buttonVariants } from "./ui/button"
import { StarIcon } from "lucide-react"

export default function Hero() {
    return (
        <>
            <div className="flex flex-col gap-4 pt-12 pb-8 max-w-lg">
                <h1 className="text-3xl font-medium">
                    It has never been easier to find the right projects or designs by inspiring successful people.
                </h1>
                <div className="flex gap-2">
                    <Link
                        target="_blank"
                        className={buttonVariants({ variant: "default", className: "!rounded-full w-fit h-8 px-2 " })}
                        href="https://twitter.com/intent/tweet"
                    >
                        Tweet about us
                    </Link>
                    <Link
                        target="_blank"
                        className={buttonVariants({ variant: "outline", className: "!rounded-full w-fit h-8 px-2 " })}
                        href="https://github.com/swajp/list-swajp.me"
                    >
                        <StarIcon className="w-3 h-3 mr-1" fill="black" />
                        Give us a star
                    </Link>
                </div>
            </div>
        </>
    )
}
