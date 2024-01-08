import { GeistSans } from "geist/font/sans"

import "./globals.css"

import { Analytics } from "@vercel/analytics/react"

import { ThemeProvider } from "@/components/ui/theme-provider"
import Footer from "@/components/global/Footer"
import Nav from "@/components/global/Navbar"

export const metadata = {
  title: "Stacks",
  description: "A catalog of web dev stacks generated by users.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body className="bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="flex min-h-screen flex-col items-center gap-5">
            <Nav />
            <div className="max-w-4xl flex-1 px-5 md:px-0">{children}</div>
            <Footer />
          </main>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
