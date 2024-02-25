"use client"

import { NextUIProvider } from "@nextui-org/system"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { useRouter } from "next/navigation"

export function Providers({ children }: { children: React.ReactNode }) {
  const router = useRouter()

  return (
    <NextUIProvider navigate={router.push as () => void}>
      <NextThemesProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </NextThemesProvider>
    </NextUIProvider>
  )
}
