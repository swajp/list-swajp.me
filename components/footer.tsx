import Link from "next/link"

export default function Footer() {
    return (
        <footer className="flex items-center justify-center py-3 border-t h-12">
            <p className="text-muted-foreground">
                by{" "}
                <Link className="text-muted-foreground hover:text-primary transition-colors" href="https://swajp.me">
                    swajp
                </Link>{" "}
                /{" "}
                <Link className="text-muted-foreground hover:text-primary transition-colors" href={"/changelog"}>
                    changelog
                </Link>
                - support the project on{" "}
                <Link
                    className="text-muted-foreground hover:text-primary transition-colors"
                    href="https://buymeacoffee.com/swajp"
                >
                    buymeacoffee
                </Link>
            </p>
        </footer>
    )
}
