"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";

const Homepage = () => {
  const { data: session } = useSession();

  return (
    <div>
      {session?.user ? (
        <Link href="/protectedRoute">Protected Route</Link>
      ) : (
        <Link href="/login">Login</Link>
      )}
      <h1>Homepage</h1>
    </div>
  );
};

export default Homepage;
