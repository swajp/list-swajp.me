import { Box, PanelsTopLeft, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import SubmitProject from "./submit-project"
import SubmitDialog from "./submit-dialog"

export default function SubmitButton() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button size={"icon"} className="!rounded-full border-2 border-muted-foreground/10 bg-transparent/40" variant="secondary">
                    <Plus className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40">
                <DropdownMenuGroup>
                    <SubmitDialog>
                        <DropdownMenuItem onSelect={e => e.preventDefault()}>
                            <div className="flex">
                                <PanelsTopLeft className="mr-2 h-4 w-4" />
                                <span>Submit portfolio</span>
                            </div>
                        </DropdownMenuItem>
                    </SubmitDialog>
                    <SubmitProject>
                        <DropdownMenuItem onSelect={e => e.preventDefault()}>
                            <div className="flex">
                                <Box className="mr-2 h-4 w-4" />
                                <span>Submit project</span>
                            </div>
                        </DropdownMenuItem>
                    </SubmitProject>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
