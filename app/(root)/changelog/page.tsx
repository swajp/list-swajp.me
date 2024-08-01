import Link from "next/link"

export default function ChangelogPage() {
    return (
        <div className="h-screen pt-12">
            <h1 className="text-2xl font-medium">Changelog</h1>
            <div className="flex flex-col mt-8">
                <h2 className="font-medium">v1.7.1</h2>
                <ul className="text-sm list-disc pl-4 mt-2">
                    <li>
                        Added projects to public middleware. I accidentally didnt add it to the public middleware so
                        people couldnt see the projects page. What a mistake.
                    </li>
                </ul>
            </div>
            <div className="flex flex-col mt-8">
                <h2 className="font-medium">v1.7.0</h2>
                <ul className="text-sm list-disc pl-4 mt-2">
                    <li>
                        Added projects so you can show your project to the world and get feedback from the community or
                        new users.
                    </li>
                </ul>
            </div>
            <div className="flex flex-col mt-8">
                <h2 className="font-medium">v1.6.0</h2>
                <ul className="text-sm list-disc pl-4 mt-2">
                    <li>Added profile page where you can see your account details and portfolio requests.</li>
                </ul>
            </div>
            <div className="flex flex-col mt-8">
                <h2 className="font-medium">v1.5.0</h2>
                <ul className="text-sm list-disc pl-4 mt-2">
                    <li>Added community so people can share their portfolios</li>
                </ul>
            </div>
            <div className="flex flex-col mt-8">
                <h2 className="font-medium">v1.4.2</h2>
                <ul className="text-sm list-disc pl-4 mt-2">
                    <li>New category: Google</li>
                    <li>Changed button padding</li>
                </ul>
            </div>
            <div className="flex flex-col mt-8">
                <h2 className="font-medium">v1.4.1</h2>
                <ul className="text-sm list-disc pl-4 mt-2">
                    <li>New category: Other</li>
                </ul>
            </div>
            <div className="flex flex-col mt-8">
                <h2 className="font-medium">v1.4.0</h2>
                <ul className="text-sm list-disc pl-4 mt-2">
                    <li>
                        Add feature to create own account so you can later show your own portfolio to the world or
                        upvote others websites.
                    </li>
                </ul>
            </div>
            <div className="flex flex-col mt-8">
                <h2 className="font-medium">v1.3.0</h2>
                <ul className="text-sm list-disc pl-4 mt-2">
                    <li>Removed contribute through google form and added contribute form on the website.</li>
                </ul>
            </div>
            <div className="flex flex-col mt-8">
                <h2 className="font-medium">v1.2.1</h2>
                <ul className="text-sm list-disc pl-4 mt-2">
                    <li>Added give us a star button in hero section.</li>
                </ul>
            </div>
            <div className="flex flex-col mt-8">
                <h2 className="font-medium">v1.2.0</h2>
                <ul className="text-sm list-disc pl-4 mt-2">
                    <li>
                        This projects is now open source, you can find the code{" "}
                        <Link href={"https://github.com/swajp/list-swajp.me"} className="underline">
                            here
                        </Link>{" "}
                    </li>
                </ul>
            </div>
            <div className="flex flex-col mt-8">
                <h2 className="font-medium">v1.1.2</h2>
                <ul className="text-sm list-disc pl-4 mt-2">
                    <li>New category: Meta</li>
                </ul>
            </div>
            <div className="flex flex-col mt-8">
                <h2 className="font-medium">v1.1.1</h2>
                <ul className="text-sm list-disc pl-4 mt-2">
                    <li>Typo link fix, thanks to @eagle1087</li>
                </ul>
            </div>
            <div className="flex flex-col mt-8">
                <h2 className="font-medium">v1.1.0</h2>
                <ul className="text-sm list-disc pl-4 mt-2">
                    <li>Added filtering all handled by server</li>
                    <li>Added new websites</li>
                    <li>New category: Spotify</li>
                </ul>
            </div>
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
