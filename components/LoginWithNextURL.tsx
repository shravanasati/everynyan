"use client"

import Link from "next/link"
import { Button } from "./ui/button"
import { usePathname, useSearchParams } from "next/navigation"

export function LoginWithNextURL() {
	const pathname = usePathname()
	const searchParams = useSearchParams()
	const params = searchParams.toString()
	// Encode the entire URL as a single value
	const fullPath = `${pathname}${params ? `?${params}` : ''}`
	const nextURL = encodeURIComponent(fullPath)

	return (
		<Button variant="outline" asChild className="w-full sm:w-auto">
			<Link href={`/login?next=${nextURL}`}>Login</Link>
		</Button>
	)
}