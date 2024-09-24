"use client"

import { useEffect } from "react"

export default function Loader() {
    useEffect(() => {
        async function getLoader() {
            const { ping } = await import("ldrs")
            ping.register()
        }
        getLoader()
    }, [])
    return <l-ping size="30" speed="1" color="#737373"></l-ping>
}
