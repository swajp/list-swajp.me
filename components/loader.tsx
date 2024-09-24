"use client"

import { ping } from "ldrs"

export default function Loader() {
    ping.register()
    return <l-ping size="30" speed="1" color="#737373"></l-ping>
}
