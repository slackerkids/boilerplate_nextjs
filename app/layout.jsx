import "@/styles/globals.css";
import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";

export const metadata = {
  title: "Project",
  description: "Project",
};

export default async function RootLayout({ children }) {
  const session = await auth();
  return (
    <html lang="en">
      <body>
        <SessionProvider session={session}>
          <main>{children}</main>
        </SessionProvider>
      </body>
    </html>
  );
}
