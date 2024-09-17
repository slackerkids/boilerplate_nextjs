import { lemonSqueezySetup } from "@lemonsqueezy/lemonsqueezy.js";

export const lemonsqueezy = new lemonSqueezySetup({
  apiKey: process.env.LEMONSQUEEZY_API_KEY,
});
