"use client";

import { useEffect, useState } from "react";
import { createDirectus, rest, readItems } from "@directus/sdk";

interface PaymentMethods {
  id: string;
  paymentMethodImage: string;
  paymentMethod: string;
}

export default function PaymentMethods() {
  const [methods, setMethods] = useState<PaymentMethods[]>([]);
  const apiUrl = process.env.NEXT_PUBLIC_DIRECTUS_API_URL as string;

  useEffect(() => {
    async function fetchMethods() {
      const directus = createDirectus(apiUrl).with(rest());

      try {
        const response = await directus.request(
          readItems<PaymentMethods[]>("Payment_Methods"),
        );
        setMethods(response || []); // Handle empty responses gracefully
      } catch (error) {
        console.error("Error fetching payment methods:", error);
      }
    }

    fetchMethods();
  }, [apiUrl]);

  return (
    <div className="space-y-2 w-full grid place-content-center md:place-content-start">
      <h1 className="font-bold">PAYMENT METHODS WE ACCEPT</h1>
      <div className="flex gap-2">
        {methods.map((method) => (
          <img
            key={method.id}
            src={`${apiUrl}/assets/${method.paymentMethodImage}`}
            alt={method.paymentMethod}
            className="h-7 w-7 object-contain mb-4 rounded"
          />
        ))}
      </div>
    </div>
  );
}
