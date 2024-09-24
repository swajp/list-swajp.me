"use client"

import { useState, useEffect } from "react"
import { Button } from "./ui/button"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle } from "./ui/dialog"
import Image from "next/image"

export default function NewFeature() {
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        const hasDismissed = localStorage.getItem("dismissedNewFeatureN1")
        if (!hasDismissed) {
            setIsOpen(true)
        }
    }, [])

    const handleClose = () => {
        setIsOpen(false)
        localStorage.setItem("dismissedNewFeatureN1", "true")
    }

    return (
        <Dialog open={isOpen}>
            <DialogContent showCloseButton={false} className="max-w-sm h-full max-h-[26rem]">
                <div>
                    <Image src={"/feature.webp"} alt="submitted" width={504} height={304} className="rounded-xl border my-4" />
                    <div className="text-center">
                        <DialogTitle className="text-xl font-medium mt-2">Version 2.0 is here!</DialogTitle>
                        <DialogDescription className="mt-2">
                            From now you can upvote your favorite portfolios and projects from our community! 🚀
                        </DialogDescription>
                        <Button onClick={handleClose} size={"sm"} className="mt-3 !rounded-full">
                            Get started!
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
