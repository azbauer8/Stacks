"use client"

import { GithubIcon } from "lucide-react"
import Image from "next/image"
// @ts-expect-error
import { useFormStatus } from "react-dom"

import { Button } from "@/components/ui/button"

export function LoginButton() {
  const { pending } = useFormStatus()

  return (
    <Button className="flex h-fit items-center gap-1 px-1.5 py-2">
      {pending ? (
        <Image
          src={"/svg-loaders/tail-spin.svg"}
          alt="Loading"
          width={20}
          height={20}
        />
      ) : (
        <GithubIcon className="size-5" />
      )}
      Sign In
    </Button>
  )
}
