import LoginDialog from "@/components/login-dialog"
import ProjectsList from "@/components/projects-list"
import SubmitProject from "@/components/submit-project"
import { Button } from "@/components/ui/button"
import { SignedIn, SignedOut } from "@clerk/nextjs"

export default function CommunityPage() {
    return (
        <div>
            <div className="flex flex-col gap-4 pt-12 pb-8 max-w-lg">
                <h1 className="text-3xl font-medium">
                    Show your project to the world and get feedback from the community or new users.
                </h1>
                <SignedOut>
                    <LoginDialog>
                        <Button variant="default" className="!rounded-full w-fit h-8 px-2 ">
                            Submit my project
                        </Button>
                    </LoginDialog>
                </SignedOut>
                <SignedIn>
                    <SubmitProject>
                        <Button variant="default" className="!rounded-full w-fit h-8 px-2 ">
                            Submit my project
                        </Button>
                    </SubmitProject>
                </SignedIn>
            </div>
            <ProjectsList />
        </div>
    )
}
