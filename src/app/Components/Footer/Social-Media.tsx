"use client";

import { useEffect, useState } from "react";
import { createDirectus, rest, readItems } from "@directus/sdk";
import Link from "next/link";

interface SocialMedia {
  id: string;
  icon: string;
  link: string;
}

export default function SocialMedia() {
  const [socialMedia, setSocialMEdia] = useState<SocialMedia[]>([]);
  const apiUrl = process.env.NEXT_PUBLIC_DIRECTUS_API_URL as string;

  useEffect(() => {
    async function fetchMethods() {
      const directus = createDirectus(apiUrl).with(rest());

      try {
        const response = await directus.request(
          readItems<SocialMedia[]>("SocialMediaLinks"),
        );
        setSocialMEdia(response || []); // Handle empty responses gracefully
      } catch (error) {
        console.error("Error fetching payment methods:", error);
      }
    }

    fetchMethods();
  }, [apiUrl]);

  //console.log(methods);

  return (
    <div className="space-y-2 w-full grid place-content-center md:place-content-end">
      <div className="flex gap-2">
        {socialMedia.map((social) => (
          <Link href={social.link}>
            <img
              key={social.id}
              src={`${apiUrl}/assets/${social.icon}`}
              alt={social.link}
              className="h-7 w-7 object-contain mb-4 rounded"
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
