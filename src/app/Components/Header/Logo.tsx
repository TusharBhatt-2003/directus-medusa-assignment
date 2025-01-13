"use client";
import { useEffect, useState } from "react";
import { readSingleton } from "@directus/sdk";
import directus from "@/directus/client";
import Link from "next/link";

interface Logo {
  id: string;
  logoImg: string;
}

export default function LogoComponent() {
  const [LOGOimg, setLOGOimg] = useState<Logo>();
  const apiUrl = process.env.NEXT_PUBLIC_DIRECTUS_API_URL as string;

  useEffect(() => {
    async function fetchLogo() {
      try {
        // Fetch the data from the 'Logo' collection
        const response = await directus.request(readSingleton("Logo"));
        setLOGOimg(response as Logo);
      } catch (error) {
        console.error("Error fetching logo data:", error);
      }
    }

    fetchLogo();
  }, [apiUrl]);

  return (
    <div className="md:border-r border-[#FFFFFF33]  lg:px-10 flex justify-center items-center">
      {LOGOimg ? (
        <Link href="/">
          <img
            src={`${apiUrl}/assets/${LOGOimg.logoImg}`}
            alt="Logo"
            width={200}
            height={200}
            className="h-auto w-auto"
          />
        </Link>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
