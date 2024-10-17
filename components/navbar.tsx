"use client"

import { useEffect, useState } from "react"
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs"
import Link from "next/link"
import { Button, buttonVariants } from "./ui/button"
import { ModeSwitcher } from "./mode-switcher"
import Image from "next/image"
import SubmitButton from "./submit-button"

export default function Navbar() {
    const [showLinks, setShowLinks] = useState(true)
    let lastScrollY = 0

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > lastScrollY) {
                setShowLinks(false)
            } else {
                setShowLinks(true)
            }
            lastScrollY = window.scrollY
        }

        window.addEventListener("scroll", handleScroll)

        return () => {
            window.removeEventListener("scroll", handleScroll)
        }
    }, [])

    return (
        <nav className="h-20 fixed top-0 left-0 right-0 flex items-center z-50 justify-center">
            <div
                className={`flex items-center justify-center gap-3 p-2 px-4 bg-muted/70 backdrop-blur-sm transition-all duration-300 rounded-full ${
                    showLinks ? "max-w-[470px] w-full md:gap-8" : "max-w-[280px] w-full md:gap-2"
                }`}
            >
                <Link className="flex text-sm items-center" href={"/"}>
                    <Image width={32} height={32} src="/list-logo.png" alt="Logo" />
                </Link>
                <div
                    className={`flex items-center gap-3 text-sm text-muted-foreground transition-all duration-300 ${
                        showLinks ? "opacity-100 max-w-full" : "opacity-0 max-w-0 overflow-hidden"
                    }`}
                >
                    <Link href={"/community"}>Community</Link>
                    <Link href={"/projects"}>Projects</Link>
                </div>
                <div className="flex gap-1 md:gap-2 items-center">
                    <SignedOut>
                        <Button className="!rounded-full bg-gradient-to-b from-secondary/30 to-primary h-8">
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
                    <SubmitButton />
                </div>
            </div>
        </nav>
    )
}
