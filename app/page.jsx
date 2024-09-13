import { auth } from "@/auth";
import { redirect } from "next/navigation";
import SignIn from "@/components/SignIn";

const Homepage = () => {
  const session = auth();
  if (session?.user) redirect("/protectedRoute");
  
  return (
    <div>
      <SignIn/>
    </div>
  )
};

export default Homepage;
