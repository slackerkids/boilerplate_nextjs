import { signOut } from "@/auth";

const SignOut = () => {
  return (
    <div>
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <button className="btn" type="submit">Sign Out</button>
      </form>
    </div>
  );
};

export default SignOut;
