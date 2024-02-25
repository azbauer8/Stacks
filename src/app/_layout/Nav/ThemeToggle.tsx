"use client"

import { Button } from "@nextui-org/react"
import { MoonIcon, SunIcon, SunMoonIcon } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <ThemeButton placeholder>
        <SunMoonIcon className="size-[1.2rem]" />
      </ThemeButton>
    )
  }

  function toggleTheme() {
    setTheme(
      theme === "system" ? "light" : theme === "light" ? "dark" : "system",
    )
  }

  const icon =
    theme === "system" ? (
      <SunMoonIcon className="size-[1.2rem]" />
    ) : theme === "light" ? (
      <SunIcon className="size-[1.2rem]" />
    ) : (
      <MoonIcon className="size-[1.2rem]" />
    )

  return <ThemeButton>{icon}</ThemeButton>

  function ThemeButton({
    placeholder,
    children,
  }: { placeholder?: boolean; children: React.ReactNode }) {
    return (
      <Button
        isIconOnly
        size="sm"
        variant="ghost"
        aria-label="Theme toggle placeholder"
        onClick={placeholder ? undefined : toggleTheme}
      >
        {children}
      </Button>
    )
  }
}
