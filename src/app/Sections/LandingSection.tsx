"use client";
import React, { useEffect, useState } from "react";
import Button from "../Components/Button/Button";
import { createDirectus, rest, readItems } from "@directus/sdk";

interface Hero {
  heroData: {
    id: string;
    heroTitle: string;
    heroPara: string;
    btnText: string;
    heroImg: string;
  };
}

export default function LandingSection() {
  const [heroData, setHeroData] = useState<Hero[]>([]);
  const apiUrl = process.env.NEXT_PUBLIC_DIRECTUS_API_URL as string;

  useEffect(() => {
    async function fetchHeroData() {
      const directus = createDirectus(apiUrl).with(rest());
      try {
        // Fetch all items from the 'Hero' collection
        const response = await directus.request(readItems<Hero[]>("Hero"));
        setHeroData(response || []); // Handle empty responses gracefully
      } catch (error) {
        console.error("Error fetching hero data:", error);
      }
    }

    fetchHeroData();
  }, [apiUrl]);

  console.log(heroData);

  return (
    <div
      className=" h-screen flex justify-center items-center w-full bg-cover bg-center"
      style={{
        backgroundImage: `url(${apiUrl}/assets/${heroData.heroImg})`,
      }}
    >
      <div className="container w-full">
        <div className="md:w-[40%] space-y-3 mx-10">
          <p className="text-[#107C11]">{heroData.heroTitle}</p>
          <p className="text-white text-5xl">{heroData.heroPara}</p>
          <div className="w-[50%] md:w-[30%]">
            <Button text={heroData.btnText} icon="true" />
          </div>
        </div>
      </div>
    </div>
  );
}
