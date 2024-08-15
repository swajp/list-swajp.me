import CommunityList from "@/components/community-list"
import SubmitDialog from "@/components/submit-dialog"
import { Button } from "@/components/ui/button"
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs"

export default function CommunityPage() {
    return (
        <div>
            <div className="flex flex-col gap-4 pt-12 pb-8 max-w-lg">
                <h1 className="text-3xl font-medium">
                    Show your portfolio to the world and get feedback from the community.
                </h1>
                <SignedOut>
                    <SignInButton mode="modal">
                        <Button variant="default" className="!rounded-full w-fit h-8 px-2 ">
                            Submit my portfolio
                        </Button>
                    </SignInButton>
                </SignedOut>
                <SignedIn>
                    <SubmitDialog>
                        <Button variant="default" className="!rounded-full w-fit h-8 px-2 ">
                            Submit my portfolio
                        </Button>
                    </SubmitDialog>
                </SignedIn>
            </div>
            <CommunityList />
        </div>
    )
}
