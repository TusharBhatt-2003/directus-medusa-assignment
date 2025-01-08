"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { createDirectus, rest, readItems } from "@directus/sdk";
import Link from "next/link";

interface Logo {
  logoImg: string;
  id: string;
}

export default function Logo() {
  const [LOGO_img, set_LOGO_img] = useState<Logo>;
  const apiUrl = process.env.NEXT_PUBLIC_DIRECTUS_API_URL as string;

  useEffect(() => {
    async function fetchHeroData() {
      const directus = createDirectus(apiUrl).with(rest());
      try {
        // Fetch all items from the 'Hero' collection
        const response = await directus.request(readItems<Logo>("Logo"));
        set_LOGO_img(response || []); // Handle empty responses gracefully
      } catch (error) {
        console.error("Error fetching hero data:", error);
      }
    }

    fetchHeroData();
  }, [apiUrl]);

  return (
    <div className="md:border-r border-[#FFFFFF33] md:px-10 flex justify-center items-center">
      <Image
        src={`${apiUrl}/assets/${LOGO_img.logoImg}`}
        priority
        alt="Logo"
        width={100}
        height={100}
        className="h-auto w-auto"
      />
    </div>
  );
}
