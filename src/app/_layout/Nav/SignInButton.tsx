"use client"

import { Button } from "@nextui-org/react"
import { GithubIcon } from "lucide-react"
import Image from "next/image"
import { useFormStatus } from "react-dom"

export function SignInButton() {
  const { pending } = useFormStatus()

  return (
    <Button
      type="submit"
      size="sm"
      variant="ghost"
      className="font-medium gap-1"
      startContent={
        pending ? (
          <Image src={"/loader.svg"} alt="Loading" width={18} height={18} />
        ) : (
          <GithubIcon className="size-[18px]" />
        )
      }
    >
      Sign In
    </Button>
  )
}
