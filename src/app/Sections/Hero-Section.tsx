"use client";
import React, { useEffect, useState } from "react";
import Button from "../Components/Button/Button";
import { createDirectus, rest, readItems, readSingleton } from "@directus/sdk";
import HeroContent from "../Components/Content/HeroContent";
import HeadingDescription from "../Components/Heading-Description/Heading-Description";
import Link from "next/link";

interface Hero {
  id: string;
  heroTitle: string;
  heroPara: string;
  btnText: string;
  heroImg: string;
}

export default function HeroSection() {
  const [heroData, setHeroData] = useState<Hero[]>([]);
  const apiUrl = process.env.NEXT_PUBLIC_DIRECTUS_API_URL as string;

  useEffect(() => {
    async function fetchHeroData() {
      const directus = createDirectus(apiUrl).with(rest());
      try {
        // Fetch all items from the 'Hero' collection
        const response = await directus.request(readSingleton("Hero"));
        setHeroData(response as Hero[]);
      } catch (error) {
        console.error("Error fetching hero data:", error);
      }
    }

    fetchHeroData();
  }, [apiUrl]);

  //console.log(heroData);

  return (
    <div
      className="relative h-screen flex justify-center items-end md:items-center w-full bg-cover bg-center"
      style={{
        backgroundImage: `url(${apiUrl}/assets/${heroData.heroImg})`,
      }}
    >
      <div className="container w-full my-20 md:my-0">
        <div className="md:w-[40%] space-y-3 md:mx-10">
          {/* <p className="text-[#107C11] font-semibold">{heroData.heroTitle}</p>
          <p className="text-white text-5xl">{heroData.heroPara}</p> */}
          <HeadingDescription
            subtitle={heroData.heroTitle}
            heading={heroData.heroPara}
            desc=""
            className="text-white"
          />
          <div className="md:w-[60%] lg:w-[30%]">
            <Link href="/category/220mp">
              <Button text={heroData.btnText} icon={true} />
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden  absolute bottom-0 right-0 left-0 w-full lg:flex justify-center items-center z-[99]">
        <HeroContent />
      </div>
    </div>
  );
}
