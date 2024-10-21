import { NextResponse } from "next/server";
import { headers } from "next/headers";
import dbConnect from "@/lib/dbConnect";
import crypto from "crypto";
import config from "@/lib/config";
import User from "@/models/user";

export async function POST(req) {
  const secret = process.env.LEMONSQUEEZY_WEBHOOK_SECRET;
  if (!secret) {
    return new Response("LEMONSQUEEZY_WEBHOOK_SECRET is required.", {
      status: 400,
    });
  }

  await dbConnect();

  // Verify the signature
  const text = await req.text();

  const hmac = crypto.createHmac("sha256", secret);
  const digest = Buffer.from(hmac.update(text).digest("hex"), "utf8");
  const signature = Buffer.from(headers().get("x-signature"), "utf8");

  if (!crypto.timingSafeEqual(digest, signature)) {
    return new Response("Invalid signature.", {
      status: 400,
    });
  }

  // Get the payload
  const payload = JSON.parse(text);

  const eventName = payload.meta.event_name;
  const customerId = payload.data.attributes.customer_id.toString();

  try {
    switch (eventName) {
      case "order_created": {
        // ✅ Grant access to the product
        const userId = payload.meta?.custom_data?.userId;
        const email = payload.data.attributes.user_email;
        const name = payload.data.attributes.user_name;
        const variantId =payload.data.attributes.first_order_item.variant_id.toString();
        const plan = config.lemonsqueezy.plans.find(
          (p) => p.variantId === variantId
        );
        if (!plan) {
          throw new Error("Plan not found for variantId:", variantId);
        }
        
        let user;

        // Get or create the user. userId is normally pass in the checkout session (clientReferenceID) to identify the user when we get the webhook event
        if (userId) {
          user = await User.findById(userId);
        } else if (email) {
          user = await User.findOne({ email });

          // If user not found create one
          // if (!user) {
          //   user = await User.create({
          //     email,
          //     name,
          //   });

          //   await user.save();
          // }

        } else {
          throw new Error("No user found");
        }

        // Update user data + Grant user access to your product. It's a boolean in the database, but could be a number of credits, etc...
        user.variantId = variantId;
        user.customerId = customerId;
        user.hasAccess = true;
        await user.save();

        // Extra: send email with user link, product page, etc...
        // try {
        //   await sendEmail(...);
        // } catch (e) {
        //   console.error("Email issue:" + e?.message);
        // }

        break;
      }

      case "subscription_cancelled": {
        // The customer subscription stopped
        // ❌ Revoke access to the product

        const user = await User.findOne({ customerId });

        // Revoke access to your product
        user.hasAccess = false;
        await user.save();

        break;
      }

      default:
      // Unhandled event type
    }
  } catch (e) {
    console.error("lemonsqueezy error: ", e.message);
  }

  return NextResponse.json({});
}
