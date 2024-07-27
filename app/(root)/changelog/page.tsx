export default function ChangelogPage() {
    return (
        <div className="h-screen pt-12">
            <h1 className="text-2xl font-medium">Changelog</h1>
            <div className="flex flex-col mt-8">
                <h2 className="font-medium">v1.0.1</h2>
                <ul className="text-sm list-disc pl-4 mt-2">
                    <li>Added new websites to Apple & Vercel categories</li>
                </ul>
            </div>
            <div className="flex flex-col mt-8">
                <h2 className="font-medium">v1.0.0</h2>
                <ul className="text-sm list-disc pl-4 mt-2">
                    <li>First version of the website (i hope people will contribute)</li>
                </ul>
            </div>
        </div>
    )
}
