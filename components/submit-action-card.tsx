import { buttonVariants } from "./ui/button"
import Image from "next/image"

export default function SubmitActionCard({ text }: { text: string }) {
    return (
        <div className="relative border rounded-lg overflow-hidden">
            <Image className="rounded-lg blur-sm " quality={100} src={"/erik.png"} alt={"More projects"} width={453} height={254} />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div
                    className={buttonVariants({
                        variant: "default",
                        className: "!rounded-full text-xs border border-secondary/20 gap-0.5 h-7 !px-2"
                    })}
                >
                    {text}
                </div>
            </div>
        </div>
    )
}
