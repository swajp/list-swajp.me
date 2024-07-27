import { buttonVariants } from "@/components/ui/button"
import Link from "next/link"

export default function Contributors() {
    return (
        <div className="h-screen pt-12">
            <h1 className="text-2xl font-medium">Lovely contributors</h1>
            <p className="text-muted-foreground mt-2 text-sm max-w-lg">
                Do you know about other successful people's portfolios? Send them to me as many as you can, and you will
                appear on this page! Don't forget to share your X account.
            </p>
            <Link
                target="_blank"
                className={buttonVariants({ variant: "default", className: "!rounded-full w-fit h-7 px-2 mt-4 " })}
                href="https://forms.gle/8hospJFRbu6wDGbn6"
            >
                contribute
            </Link>
            <div className="flex flex-col mt-8"></div>
        </div>
    )
}
