import Link from "next/link"

export default function Footer() {
    return (
        <footer className="flex items-center justify-center py-3 border-t h-12">
            <p className="text-muted-foreground">
                by <Link href="https://swajp.me">swajp</Link>
            </p>
        </footer>
    )
}
