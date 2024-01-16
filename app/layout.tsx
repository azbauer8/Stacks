import { GeistSans } from "geist/font/sans"

import "./globals.css"

import { Suspense } from "react"

import { ThemeProvider } from "@/components/ui/theme-provider"
import Footer from "@/components/global/Footer"
import Nav from "@/components/global/Navbar"
import NavLoader from "@/components/global/Navbar/NavLoader"

export const metadata = {
  title: "Stacks",
  description: "A catalog of web dev stacks generated by users.",
}

export default function RootLayout({
  children,
  stackModal,
}: {
  children: React.ReactNode
  stackModal: React.ReactNode
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
            <Suspense fallback={<NavLoader />}>
              <Nav />
            </Suspense>
            <div className="w-full max-w-4xl flex-1 px-5 md:px-0">
              {children}
            </div>
            <Footer />
          </main>
          {stackModal}
        </ThemeProvider>
      </body>
    </html>
  )
}
