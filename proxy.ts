import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function proxy(request: NextRequest) {
  const token = request.cookies.get("auth_token")?.value
  const isAuthPage = request.nextUrl.pathname.startsWith("/login")
  const isProtectedPage = request.nextUrl.pathname.startsWith("/dashboard")

  // Redirect authenticated users away from login page
  if (isAuthPage && token) {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }
  

  // Allow all other requests
  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
