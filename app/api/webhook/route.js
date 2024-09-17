import crypto from "node:crypto";

export async function POST(request) {
  if (!process.env.LEMONSQUEEZY_WEBHOOK_SECRET) {
    return new Response("Lemon Squeezy Webhook Secret not set in .env", {
      status: 500,
    });
  }

  // Checking the request from Lemon Squeezy

  // Get the raw body content.
  const rawBody = await request.text();

  // Get the webhook secret from the environment variables.
  const secret = process.env.LEMONSQUEEZY_WEBHOOK_SECRET;

  // Get the signature from the request headers.
  const signature = Buffer.from(
    request.headers.get("X-Signature") ?? "",
    "hex"
  );

  // Create a HMAC-SHA256 hash of the raw body content using the secret and
  // compare it to the signature.
  const hmac = Buffer.from(
    crypto.createHmac("sha256", secret).update(rawBody).digest("hex"),
    "hex"
  );

  if (!crypto.timingSafeEqual(hmac, signature)) {
    return new Response("Invalid signature", { status: 400 });
  }

  // If pass, request is Valid

  const data = JSON.parse(rawBody);

  if (data) {
    // Do whatever you want.

    return new Response("OK", { status: 200 });
  }

  return new Response("Data invalid", { status: 400 });
}
