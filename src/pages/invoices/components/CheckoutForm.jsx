import { useCallback } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from "@stripe/react-stripe-js";
import { useAuth } from "@clerk/clerk-react";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

export default function CheckoutForm({ invoiceId }) {
  const { getToken } = useAuth();

  const fetchClientSecret = useCallback(async () => {
    const token = await getToken();
    const res = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/payments/create-checkout-session`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ invoiceId }),
      }
    );
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      console.error("Stripe session error:", err);
      throw new Error(err?.message || "Failed to create checkout session");
    }
    const data = await res.json();
    return data.clientSecret;
  }, [invoiceId, getToken]);

  return (
    <EmbeddedCheckoutProvider stripe={stripePromise} options={{ fetchClientSecret }}>
      <EmbeddedCheckout />
    </EmbeddedCheckoutProvider>
  );
}
