"use client";

import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";

const ProtectedRoute = () => {
  const { data: session } = useSession();
  if (!session) return redirect("/login");

  const handleClick = async () => {
    await signOut();
  };

  return (
    <div>
      <button onClick={handleClick} className="btn">
        Sign Out
      </button>
      This is protected route
    </div>
  );
};

export default ProtectedRoute;
