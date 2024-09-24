import { ClerkLoaded, ClerkLoading, SignedIn, SignedOut, SignIn, SignInButton } from "@clerk/nextjs"
import Link from "next/link"
import { Button, buttonVariants } from "./ui/button"
import Loader from "./loader"
import { ModeSwitcher } from "./mode-switcher"

export default function Navbar() {
    return (
        <nav className="h-20 flex justify-between">
            <div className="flex gap-4 items-center justify-center">
                <Link className="text-muted-foreground hover:text-primary transition-colors" href={"/"}>
                    home
                </Link>
                <Link className="text-muted-foreground hover:text-primary transition-colors" href={"/community"}>
                    community
                </Link>
                <Link className="text-muted-foreground hover:text-primary transition-colors" href={"/projects"}>
                    projects
                </Link>
            </div>
            <div className="flex items-center justify-center gap-2">
                <ModeSwitcher />
                <ClerkLoading>
                    <div className="flex w-[2.8rem] items-center justify-center">
                        <Loader />
                    </div>
                </ClerkLoading>
                <ClerkLoaded>
                    <SignedOut>
                        <Button variant={"ghost"} size={"icon"} className="!rounded-full flex items-center justify-center">
                            <SignInButton mode="modal">
                                <svg
                                    className="fill-muted-foreground"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 16 16"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M8 8C8.69223 8 9.36892 7.79473 9.9445 7.41014C10.5201 7.02556 10.9687 6.47893 11.2336 5.83939C11.4985 5.19985 11.5678 4.49612 11.4327 3.81719C11.2977 3.13825 10.9644 2.51461 10.4749 2.02513C9.98539 1.53564 9.36175 1.2023 8.68282 1.06725C8.00388 0.932205 7.30015 1.00152 6.66061 1.26642C6.02107 1.53133 5.47444 1.97993 5.08986 2.55551C4.70527 3.13108 4.5 3.80777 4.5 4.5C4.5 5.42826 4.86875 6.3185 5.52513 6.97487C6.1815 7.63125 7.07174 8 8 8ZM8 9C5.83063 9 1.5 10.34 1.5 13V15H14.5V13C14.5 10.34 10.1694 9 8 9Z" />
                                </svg>
                            </SignInButton>
                        </Button>
                    </SignedOut>
                    <SignedIn>
                        <Link
                            href="/profile"
                            className={buttonVariants({
                                className: "!rounded-full flex items-center justify-center",
                                size: "icon",
                                variant: "ghost"
                            })}
                        >
                            <svg
                                className="fill-muted-foreground"
                                width="24"
                                height="24"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M8 8C8.69223 8 9.36892 7.79473 9.9445 7.41014C10.5201 7.02556 10.9687 6.47893 11.2336 5.83939C11.4985 5.19985 11.5678 4.49612 11.4327 3.81719C11.2977 3.13825 10.9644 2.51461 10.4749 2.02513C9.98539 1.53564 9.36175 1.2023 8.68282 1.06725C8.00388 0.932205 7.30015 1.00152 6.66061 1.26642C6.02107 1.53133 5.47444 1.97993 5.08986 2.55551C4.70527 3.13108 4.5 3.80777 4.5 4.5C4.5 5.42826 4.86875 6.3185 5.52513 6.97487C6.1815 7.63125 7.07174 8 8 8ZM8 9C5.83063 9 1.5 10.34 1.5 13V15H14.5V13C14.5 10.34 10.1694 9 8 9Z" />
                            </svg>
                        </Link>
                    </SignedIn>
                </ClerkLoaded>
            </div>
        </nav>
    )
}
