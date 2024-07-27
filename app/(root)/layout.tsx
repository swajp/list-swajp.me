import Footer from "@/components/footer"
import MaxWidthWrapper from "@/components/max-width-wrapper"
import Navbar from "@/components/navbar"

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <MaxWidthWrapper>
            <Navbar />
            {children}
            <Footer />
        </MaxWidthWrapper>
    )
}
