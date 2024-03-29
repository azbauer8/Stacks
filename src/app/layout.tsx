import Footer from "@/app/_layout/Footer"
import { Providers } from "@/app/_layout/Providers"

import "@/styles.css"

import { Metadata } from "next"
import { Asap } from "next/font/google"
import { siteConfig } from "@/config"
import cn from "@/utils/cn"

import Nav from "./_layout/Nav"

export const metadata: Metadata = {
  title: {
    default: siteConfig.title,
    template: `%s - ${siteConfig.title}`,
  },
  description: siteConfig.description,
  icons: {
    icon: siteConfig.favicon,
  },
}
const asap = Asap({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "bg-background text-foreground antialiased",
          asap.className
        )}
      >
        <Providers>
          <div className="relative flex min-h-screen flex-col">
            <Nav />
            <main className="container mx-auto max-w-7xl flex-1 px-5 py-10">
              {children}
            </main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  )
}
