"use client"

import Image from "next/image"
import Link from "next/link"

export default function NotFound() {
  return (
    <div
      className="relative min-h-screen w-full flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: "url('/not-found/test1.jpg')",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-black/30 via-black/20 to-black/20" />

      <div
        className="relative z-10 flex flex-col items-center text-center px-2 py-12 bg-white/10 dark:bg-black/15
          backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20"
      >
        {/* <h1 className="text-4xl sm:text-5xl font-bold text-white mb-3">404</h1>

        <h2 className="text-xl sm:text-2xl font-semibold text-white/90 mb-2">Page Not Found</h2> */}

        <h1 className="text-2xl sm:text-2xl font-semibold text-gray-100 mb-3 px-2">Please scan this QR Code</h1>

        <div className="relative mt-4 w-64 h-[320px] lg:w-[500px] lg:h-[600px] mb-6">
          <Image
            src="/qr-code.jpg"
            alt="QR Code"
            fill
            priority
            quality={100}
            unoptimized
            className="object-contain rounded-2xl w-full h-full"
          />
        </div>

        <Link
          href="/"
          className="inline-block rounded-xl bg-primary text-gray-100 px-6 py-1.5 transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          Go to Login
        </Link>
      </div>
    </div>
  )
}
