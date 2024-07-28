"use client"

import { contribute } from "@/lib/actions"
import { useFormState, useFormStatus } from "react-dom"

import { Button, buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { CircleCheck, CircleXIcon } from "lucide-react"

const initialState = {
    message: ""
}

export default function ContributeForm() {
    const [state, formAction] = useFormState(contribute, initialState)

    function SubmitButton() {
        const { pending } = useFormStatus()

        return (
            <Button type="submit" disabled={pending} className="!rounded-full w-fit">
                Submit
            </Button>
        )
    }

    return (
        <form action={formAction} className="max-w-md mt-8 flex flex-col gap-3">
            <Input id="social" name="social" className="rounded-full bg-muted" placeholder="your @ on X (optional)" />
            <Textarea
                name="web"
                id="web"
                required
                className="rounded-2xl bg-muted"
                rows={12}
                placeholder="link to website/s"
            />
            {state.message === "ok" ? (
                <div
                    className={buttonVariants({
                        className: "!rounded-full w-fit",
                        variant: "outline"
                    })}
                >
                    <CircleCheck className="w-5 h-5 mr-2" />
                    Submitted
                </div>
            ) : state.message === "fail" ? (
                <Button className="!rounded-full w-fit" variant="outline">
                    <CircleXIcon className="w-5 h-5 mr-2 text-destructive" />
                    Failed. Try again.
                </Button>
            ) : (
                <SubmitButton />
            )}
        </form>
    )
}
