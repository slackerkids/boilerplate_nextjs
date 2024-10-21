import { createLemonSqueezyCheckout } from "@/lib/lemonSqueezy";
import dbConnect from "@/lib/dbConnect";
import { auth, signIn } from "@/auth";
import User from "@/models/user";
import { NextResponse } from "next/server";

// This function is used to create a Lemon Squeezy Checkout Session (one-time payment or subscription)
// It's called by the <ButtonCheckout /> component
export async function POST(req) {
  const body = await req.json();

  if (!body.variantId) {
    return NextResponse.json(
      { error: "Variant ID is required" },
      { status: 400 }
    );
  } else if (!body.redirectUrl) {
    return NextResponse.json(
      { error: "Redirect URL is required" },
      { status: 400 }
    );
  }

  try {
    // Get the session using the new auth method
    const session = await auth();

    await dbConnect();

    // Find the user in the database based on the session user ID
    const user = await User.findById(session?.user?.id);

    const { variantId, redirectUrl } = body;

    const checkoutURL = await createLemonSqueezyCheckout({
      variantId,
      redirectUrl,
      // If user is logged in, this will automatically prefill Checkout data like email and/or credit card for faster checkout
      userId: session?.user?.id,
      email: user?.email,
      // If you send coupons from the frontend, you can pass it here
      // discountCode: body.discountCode,
    });

    return NextResponse.json({ url: checkoutURL });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: e?.message }, { status: 500 });
  }
}
