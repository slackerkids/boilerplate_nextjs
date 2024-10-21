// Lemon Squeezy pricing component config
const config = {
  appName: "App Name",
  lemonsqueezy: {
    // Create a product and add multiple variants via your Lemon Squeezy dashboard, then add them here. You can add as many plans as you want, just make sure to add the variantId.
    plans: [
      {
        // REQUIRED — we use this to find the plan in the webhook (for instance if you want to update the user's credits based on the plan)
        variantId:
          process.env.NODE_ENV === "development"
            ? "Development Variant 1"
            : "Production variant 1",
        //  REQUIRED - Name of the plan, displayed on the pricing page
        name: "Plan Name",
        // A friendly description of the plan, displayed on the pricing page. Tip: explain why this plan and not others.
        description: "Plan Description",
        // This plan will look different on the pricing page, it will be highlighted. You can only have one plan with isFeatured: true.
        isFeatured: false,
        // The price you want to display, the one user will be charged on Lemon Squeezy
        price: 9.99,
        // If you have an anchor price (i.e. $149) that you want to display crossed out, put it here. Otherwise, leave it empty.
        priceAnchor: "",
        features: [{ name: "List features here" }],
      },
      // You can copy and make other plan variants
      {
        variantId:
          process.env.NODE_ENV === "development"
            ? "Development Variant 2"
            : "Production variant 2",
        name: "Plan Name",
        description: "Plan Description",
        isFeatured: false,
        price: 9.99,
        priceAnchor: "",
        features: [{ name: "List features here" }],
      },
    ],
  },
};

export default config;
