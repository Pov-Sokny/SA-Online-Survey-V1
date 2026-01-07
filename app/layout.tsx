import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import StoreProvider from "@/lib/providers/store-provider"
import "./globals.css"
import { Toaster } from "sonner"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Super Survey – Create, Share & Analyze Surveys in Real Time",
  description:
    "Super Survey is a fast, modern, and easy-to-use online survey platform built with modern UI. Create surveys, share response links, and analyze results in real time.",
  keywords: [
    "online survey",
    "survey platform",
    "create surveys",
    "share survey responses",
    "real-time analytics",
    "modern UI survey app",
    "modern survey design",
    "fast survey tool",
  ],
  generator: "Super Survey",
  applicationName: "Super Survey",
  openGraph: {
    title: "Super Survey – Modern Online Survey Platform",
    description:
      "Create and share surveys easily with real-time response tracking. Fast, smooth, and modern survey platform built with Next.js.",
    type: "website",
    locale: "en_US",
    siteName: "Super Survey",
  },
  icons: {
    icon: [
      { url: "/logo/logo.png", media: "(prefers-color-scheme: light)" },
      { url: "/icon-dark-32x32.png", media: "(prefers-color-scheme: dark)" },
      { url: "/logo.svg", type: "image/svg+xml" },
    ],
    apple: "/logo/logo.png",
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        <StoreProvider>{children}</StoreProvider>
        <Analytics />
        <Toaster position="top-right" richColors />
      </body>
    </html>
  )
}
