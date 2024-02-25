import Footer from "@/app/_layout/Footer"
import { Providers } from "@/app/_layout/Providers"

import "@/styles.css"

import { siteConfig } from "@/config"
import clsx from "clsx"
import { Metadata } from "next"
import { Inter } from "next/font/google"
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
const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={clsx(
          "bg-background text-foreground antialiased",
          inter.className,
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
