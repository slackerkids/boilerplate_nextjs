import { signIn } from "@/auth";

const SignIn = () => {
  return (
    <div>
      <form
        action={async () => {
          "use server";
          await signIn("google", { redirectTo: "/protectedRoute" });
        }}
      >
        <button className="btn btn-primary" type="submit">SignIn with Google</button>
      </form>
    </div>
  );
};

export default SignIn;
