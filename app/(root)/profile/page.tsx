"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel"
import { useUser } from "@clerk/nextjs"
import { useMutation, useQuery } from "convex/react"
import { TrashIcon } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from "@/components/ui/alert-dialog"

export default function ProfilePage() {
    const { user } = useUser()

    if (!user) {
        return <div>Loading...</div>
    }

    const currentUser = useQuery(api.users.get, {
        userId: user.id
    })

    const portfolios = useQuery(api.portfolios.collectionByUser, {
        userId: user.id
    })

    const remove = useMutation(api.portfolios.remove)

    if (!currentUser) {
        return <div>Loading...</div>
    }

    if (!portfolios) {
        return <div>Loading...</div>
    }

    const onRemove = (portfolioId: Id<"portfolios">) => {
        const promise = remove({
            portfolioId
        })

        toast.promise(promise, {
            loading: "Přidávám like...",
            success: "Hotovo!",
            error: "Chyba při přidávání like!"
        })
    }

    function getStatus(published: boolean) {
        return published ? (
            <div className="flex gap-2 items-center">
                <div className="bg-green-500 h-2 w-2 rounded-full" />
                Pending
            </div>
        ) : (
            <div className="flex gap-2 items-center">
                <div className="bg-orange-500 h-2 w-2 rounded-full" />
                Pending
            </div>
        )
    }

    return (
        <div className="h-screen flex gap-4">
            <Card className="h-fit">
                <CardHeader>
                    <CardTitle>Overview</CardTitle>
                    <CardDescription>View your account details and activity.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-2">
                        <div>
                            <div className="text-sm text-muted-foreground">Username</div>
                            <div className="font-medium">{currentUser?.username}</div>
                        </div>
                        <div>
                            {currentUser?.xSocial && (
                                <>
                                    <div className="text-sm text-muted-foreground">X profile</div>
                                    <div className="font-medium">{currentUser.xSocial}</div>
                                </>
                            )}
                        </div>
                        <div>
                            {currentUser?.portfolio && (
                                <>
                                    <div className="text-sm text-muted-foreground">Portfolio</div>
                                    <Link href={currentUser.portfolio}>
                                        <div className="font-medium">{currentUser.portfolio}</div>
                                    </Link>
                                </>
                            )}
                        </div>
                        <div>
                            <div className="text-sm text-muted-foreground">Email</div>
                            <div className="font-medium">{currentUser?.email}</div>
                        </div>
                        <div>
                            <div className="text-sm text-muted-foreground">Joined</div>
                            <div className="font-medium">
                                {new Date(currentUser?._creationTime ?? "").toLocaleDateString()}
                            </div>
                        </div>
                    </div>
                </CardContent>
                {/* 
              <CardFooter>
                <Button>Update Profile</Button> 
              </CardFooter>
                */}
            </Card>
            <Card className="h-fit max-w-2xl w-full">
                <CardHeader>
                    <CardTitle>Requests ({portfolios.length})</CardTitle>
                    <CardDescription>
                        View your portfolio requests. Pending requests will be reviewed within 24 hours.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Type</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Url</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {portfolios.map(portfolio => (
                                <TableRow>
                                    <TableCell className="font-medium">Portfolio</TableCell>
                                    <TableCell>{portfolio.name}</TableCell>
                                    <TableCell>
                                        <Link href={portfolio.url}>{portfolio.url}</Link>
                                    </TableCell>
                                    <TableCell>{getStatus(portfolio.published)}</TableCell>
                                    <TableCell className="flex justify-center">
                                        <AlertDialog>
                                            <AlertDialogTrigger asChild>
                                                <TrashIcon className="w-5 h-5 text-muted-foreground" role="button" />
                                            </AlertDialogTrigger>
                                            <AlertDialogContent>
                                                <AlertDialogHeader>
                                                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                                    <AlertDialogDescription>
                                                        This action cannot be undone. This will permanently delete your
                                                        account and remove your data from our servers.
                                                    </AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                    <AlertDialogAction onClick={() => onRemove(portfolio._id)}>
                                                        Continue
                                                    </AlertDialogAction>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
                {/* 
              <CardFooter>
                <Button>Update Profile</Button> 
              </CardFooter>
                */}
            </Card>
        </div>
    )
}
