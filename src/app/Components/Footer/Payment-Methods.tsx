"use client";
import { useEffect, useState } from "react";
import directus from "@/directus/client";
import { readItems } from "@directus/sdk";

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
      try {
        const response = await directus.request(readItems("Payment_Methods"));
        if (Array.isArray(response)) {
          setMethods(response as PaymentMethods[]);
        } else {
          setMethods([]);
        }
      } catch (error) {
        console.error("Error fetching payment methods:", error);
        setMethods([]);
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
