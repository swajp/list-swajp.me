"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { api } from "@/convex/_generated/api"
import { useQuery } from "convex/react"
import Link from "next/link"
import { getStatus } from "../../profile/page"
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
import { EditIcon, TrashIcon } from "lucide-react"

export default function SubmitsTable() {
    const projects = useQuery(api.projects.collection, { published: false })
    const portfolios = useQuery(api.portfolios.collection, { published: false })

    if (!projects || !portfolios) {
        return <div>Loading...</div>
    }

    const mixedData = [...portfolios.map(p => ({ ...p, type: "portfolio" })), ...projects.map(p => ({ ...p, type: "project" }))]

    const sortedData = mixedData.sort((a, b) => new Date(b._creationTime).getTime() - new Date(a._creationTime).getTime())

    return (
        <Card className="h-fit w-full ">
            <CardHeader>
                <CardTitle>Requests ({mixedData.length})</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Type</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Url</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-center">Views</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {sortedData.map(data => (
                            <TableRow key={data._id}>
                                <TableCell className="font-medium">{data.type === "portfolio" ? "Portfolio" : "Project"}</TableCell>
                                <TableCell>{data.name}</TableCell>
                                <TableCell>
                                    <Link href={data.url}>{data.url}</Link>
                                </TableCell>
                                <TableCell>{getStatus(data.published)}</TableCell>
                                <TableCell className="text-center">{data.views && data.views | 0}</TableCell>
                                <TableCell>
                                    <div className="flex gap-2">
                                        <Link href={`/admin/${data.type}/${data._id}`} className="text-muted-foreground">
                                            <EditIcon className="w-5 h-5 text-muted-foreground" role="button" />
                                        </Link>
                                        <AlertDialog>
                                            <AlertDialogTrigger asChild>
                                                <TrashIcon className="w-5 h-5 text-muted-foreground" role="button" />
                                            </AlertDialogTrigger>
                                            <AlertDialogContent>
                                                <AlertDialogHeader>
                                                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                                    <AlertDialogDescription>
                                                        This action cannot be undone. This will permanently delete your account and remove your data
                                                        from our servers.
                                                    </AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}
