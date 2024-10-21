import Link from "next/link";
import { auth } from "@/auth";
import Pricing from "@/components/Pricing";

const Homepage = async () => {
  const session = await auth();
  return (
    <div>
      {session?.user ? (
        <Link href="/protectedRoute">Protected Route</Link>
      ) : (
        <Link href="/login">Login</Link>
      )}
      <h1>Homepage</h1>
      <Pricing session={session} />
    </div>
  );
};

export default Homepage;
