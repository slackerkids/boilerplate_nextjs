"use client";
import { useState } from "react";
import config from "@/lib/config";

const ButtonCheckout = ({ variantId }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handlePayment = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/lemonsqueezy/create-checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          variantId,
          redirectUrl: window.location.href,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const { url } = await response.json();
      window.location.href = url;
    } catch (e) {
      console.error("Error creating checkout:", e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      className="btn btn-primary btn-block group"
      onClick={handlePayment}
      disabled={isLoading}
    >
      {isLoading ? (
        <span className="loading loading-dots loading-md"></span>
      ) : (
        <span>Your App Logo</span>
      )}
      Get {config?.appName}
    </button>
  );
};

export default ButtonCheckout;
