"use client";
import { signIn } from "next-auth/react";

const Login = () => {
  const handleClick = async () => {
    await signIn("google");
  };

  return (
    <div className="flex min-h-screen justify-center items-center">
      <button className="btn" onClick={handleClick}>
        Sign In
      </button>
    </div>
  );
};

export default Login;
