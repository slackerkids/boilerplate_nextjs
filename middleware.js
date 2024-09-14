export { auth as middleware } from "@/auth"

// Don't invoke middleware in some paths
export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
  }