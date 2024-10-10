import { ClerkLoaded, ClerkLoading, SignedIn, SignedOut, SignIn, SignInButton } from "@clerk/nextjs"
import Link from "next/link"
import { Button, buttonVariants } from "./ui/button"
import Loader from "./loader"
import { ModeSwitcher } from "./mode-switcher"
import { currentUser } from "@clerk/nextjs/server"
import { SettingsIcon } from "lucide-react"

export default async function Navbar() {
    const ADMIN_EMAIL = process.env.ADMIN_EMAIL

    const user = await currentUser()

    const isAdmin = user?.emailAddresses[0].emailAddress === ADMIN_EMAIL
    return (
        <nav className="h-20 flex items-center justify-center">
            <div className="flex items-center justify-center border gap-3 md:gap-8 p-2 px-4 bg-muted/30 rounded-full">
                <Link className="flex text-sm items-center" href={"/"}>
                    <div className="w-4 h-4 bg-primary/90 rounded-sm" />
                    <span className="ml-2 font-bold text-primary/90 hidden md:block">list</span>
                </Link>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Link href={"/community"}>Community</Link>
                    <Link href={"/projects"}>Projects</Link>
                </div>
                <div className="flex gap-1 md:gap-2 items-center">
                    <SignedOut>
                        <Button
                            className="!rounded-full bg-gradient-to-b from-secondary/30 to-primary h-8
                            "
                        >
                            <SignInButton mode="modal">My profile</SignInButton>
                        </Button>
                    </SignedOut>
                    <SignedIn>
                        <Link
                            href={"/profile"}
                            className={buttonVariants({
                                className: "!rounded-full bg-gradient-to-b from-secondary/30 to-primary h-8"
                            })}
                        >
                            My profile
                        </Link>
                    </SignedIn>
                    <ModeSwitcher />
                </div>
            </div>
        </nav>
    )
}
