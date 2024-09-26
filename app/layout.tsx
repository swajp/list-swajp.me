import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import ConvexClientProvider from "@/components/convex-provider-clerk"
import { Toaster } from "@/components/ui/sonner"
import { ThemeProvider } from "@/components/theme-provider"
import NewFeature from "@/components/new-feature"
import { CSPostHogProvider } from "@/components/posthog-provider"

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
                <CSPostHogProvider>
                    <body className={inter.className}>
                        <ThemeProvider attribute="class" defaultTheme="system" enableSystem storageKey="list-swajp-theme" disableTransitionOnChange>
                            {children}
                            <NewFeature />
                            <Toaster />
                        </ThemeProvider>
                    </body>
                </CSPostHogProvider>
            </html>
        </ConvexClientProvider>
    )
}
