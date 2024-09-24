import { cn } from "@/lib/utils"

export default function MaxWidthWrapper({ className, children }: { className?: string; children: React.ReactNode }) {
    return <div className={cn("h-full mx-auto w-full max-w-screen-2xl px-3 md:px-20", className)}>{children}</div>
}
