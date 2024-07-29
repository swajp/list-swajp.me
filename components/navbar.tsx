import { SignedIn, SignedOut, SignInButton, SignOutButton, SignUp, SignUpButton, UserButton } from "@clerk/nextjs"
import Link from "next/link"
import LoginDialog from "./login-dialog"

export default function Navbar() {
    return (
        <nav className="h-20 flex justify-between gap-4">
            <div className="flex items-center justify-center">
                <Link className="text-muted-foreground hover:text-primary transition-colors" href={"/"}>
                    home
                </Link>
            </div>
            <div className="flex items-center justify-center gap-2">
                <Link className="text-muted-foreground hover:text-primary transition-colors" href={"/contributors"}>
                    contributors
                </Link>

                <SignedOut>
                    <LoginDialog />
                </SignedOut>
                <SignedIn>
                    <UserButton />
                </SignedIn>
            </div>
        </nav>
    )
}
