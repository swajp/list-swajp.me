import Link from "next/link"
import { buttonVariants } from "./ui/button"
import { StarIcon } from "lucide-react"
import RecentlyAdded from "./recently-added"

export default function Hero() {
    return (
        <div className="flex flex-col lg:flex-row justify-between gap-12 lg:items-center pt-24 pb-8">
            <div className="flex flex-col gap-4 max-w-lg">
                <h1 className="text-3xl font-medium">
                    It has never been easier to find the right projects or designs by inspiring successful people.
                </h1>
                <div className="flex gap-2">
                    <Link
                        target="_blank"
                        className={buttonVariants({
                            variant: "default",
                            className: "!rounded-full !bg-[#5865f2] hover:!bg-[#4753db] w-fit h-8 px-2 gap-1 !text-white"
                        })}
                        href="https://discord.gg/wbnZU3vTMb"
                    >
                        <svg className="size-5 fill-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19.2701 5.33C17.9401 4.71 16.5001 4.26 15.0001 4C14.9737 4.00038 14.9486 4.01116 14.9301 4.03C14.7501 4.36 14.5401 4.79 14.4001 5.12C12.8091 4.88015 11.1911 4.88015 9.60012 5.12C9.46012 4.78 9.25012 4.36 9.06012 4.03C9.05012 4.01 9.02012 4 8.99012 4C7.49012 4.26 6.06012 4.71 4.72012 5.33C4.71012 5.33 4.70012 5.34 4.69012 5.35C1.97012 9.42 1.22012 13.38 1.59012 17.3C1.59012 17.32 1.60012 17.34 1.62012 17.35C3.42012 18.67 5.15012 19.47 6.86012 20C6.89012 20.01 6.92012 20 6.93012 19.98C7.33012 19.43 7.69012 18.85 8.00012 18.24C8.02012 18.2 8.00012 18.16 7.96012 18.15C7.39012 17.93 6.85012 17.67 6.32012 17.37C6.28012 17.35 6.28012 17.29 6.31012 17.26C6.42012 17.18 6.53012 17.09 6.64012 17.01C6.66012 16.99 6.69012 16.99 6.71012 17C10.1501 18.57 13.8601 18.57 17.2601 17C17.2801 16.99 17.3101 16.99 17.3301 17.01C17.4401 17.1 17.5501 17.18 17.6601 17.27C17.7001 17.3 17.7001 17.36 17.6501 17.38C17.1301 17.69 16.5801 17.94 16.0101 18.16C15.9701 18.17 15.9601 18.22 15.9701 18.25C16.2901 18.86 16.6501 19.44 17.0401 19.99C17.0701 20 17.1001 20.01 17.1301 20C18.8501 19.47 20.5801 18.67 22.3801 17.35C22.4001 17.34 22.4101 17.32 22.4101 17.3C22.8501 12.77 21.6801 8.84 19.3101 5.35C19.3001 5.34 19.2901 5.33 19.2701 5.33ZM8.52012 14.91C7.49012 14.91 6.63012 13.96 6.63012 12.79C6.63012 11.62 7.47012 10.67 8.52012 10.67C9.58012 10.67 10.4201 11.63 10.4101 12.79C10.4101 13.96 9.57012 14.91 8.52012 14.91ZM15.4901 14.91C14.4601 14.91 13.6001 13.96 13.6001 12.79C13.6001 11.62 14.4401 10.67 15.4901 10.67C16.5501 10.67 17.3901 11.63 17.3801 12.79C17.3801 13.96 16.5501 14.91 15.4901 14.91Z" />
                        </svg>
                        Join us on Discord
                    </Link>
                    <Link
                        target="_blank"
                        className={buttonVariants({ variant: "outline", className: "!rounded-full w-fit h-8 px-2 " })}
                        href="https://github.com/swajp/list-swajp.me"
                    >
                        <StarIcon className="w-3 h-3 mr-1 fill-primary" />
                        Give us a star
                    </Link>
                </div>
            </div>
            <RecentlyAdded />
        </div>
    )
}
