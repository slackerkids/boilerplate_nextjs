"use client"

import { auth } from "@/auth";
import { redirect } from "next/navigation";

const ProtectedRoute = async () => {
  const session = await auth();
  if (!session) return redirect("/");

  return (
    <div>
        This is protected route
    </div>
  );
};

export default ProtectedRoute;
