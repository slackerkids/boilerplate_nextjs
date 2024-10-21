import {
  createCheckout,
  getCustomer,
  lemonSqueezySetup,
} from "@lemonsqueezy/lemonsqueezy.js";

export const createLemonSqueezyCheckout = async ({
  userId,
  email,
  redirectUrl,
  variantId,
  discountCode,
}) => {
  try {
    lemonSqueezySetup({ apiKey: process.env.LEMONSQUEEZY_API_KEY });

    const storeId = process.env.LEMONSQUEEZY_STORE_ID;

    const newCheckout = {
      productOptions: {
        redirectUrl,
      },
      checkoutData: {
        discountCode,
        email,
        custom: {
          userId,
        },
      },
    };

    const { data, error } = await createCheckout(
      storeId,
      variantId,
      newCheckout
    );

    if (error) {
      throw error;
    }

    return data.data.attributes.url;
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const createCustomerPortal = async ({ customerId }) => {
  try {
    lemonSqueezySetup({ apiKey: process.env.LEMONSQUEEZY_API_KEY });

    const { data, error } = await getCustomer(customerId);

    if (error) {
      throw error;
    }

    return data.data.attributes.urls.customer_portal;
  } catch (error) {
    console.error(error);
    return null;
  }
};
