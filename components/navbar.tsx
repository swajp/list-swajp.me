import Link from "next/link"

export default function Navbar() {
    return (
        <nav className="h-12 py-4 flex justify-between gap-4">
            <div>
                <Link className="text-muted-foreground hover:text-primary transition-colors" href={"/"}>
                    home
                </Link>
            </div>
            <div className="flex gap-2">
                <Link className="text-muted-foreground hover:text-primary transition-colors" href={"/contributors"}>
                    contributors
                </Link>

                <Link className="text-muted-foreground hover:text-primary transition-colors" href={"/changelog"}>
                    changelog
                </Link>
            </div>
        </nav>
    )
}
