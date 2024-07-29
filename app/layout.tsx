import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Analytics } from "@vercel/analytics/next"
import { ClerkProvider } from "@clerk/nextjs"
import ConvexClientProvider from "@/components/convex-provider-clerk"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
    title: "swajp - Book of amazing portfolios by amazing people",
    description:
        "Are you looking for inspiration for your portfolio? You're in the right place! Here you will find a collection of amazing portfolios by amazing people.",
    metadataBase: new URL("https://list.swajp.me")
}

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <ConvexClientProvider>
            <html lang="en">
                <body className={inter.className}>
                    {children}
                    <Analytics />
                </body>
            </html>
        </ConvexClientProvider>
    )
}
