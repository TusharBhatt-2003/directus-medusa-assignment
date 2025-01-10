"use client";
import { useEffect, useState } from "react";
import { readItems } from "@directus/sdk";
import directus from "@/directus/client";

interface HeroContent {
  id: string;
  title: string;
  subTitle: string;
}

export default function HeroContent() {
  const [contentData, setContentData] = useState<HeroContent[]>([]);
  const apiUrl = process.env.NEXT_PUBLIC_DIRECTUS_API_URL;

  useEffect(() => {
    async function fetchHeroContents() {
      if (!apiUrl) {
        console.error(
          "NEXT_PUBLIC_DIRECTUS_API_URL is not set in environment variables",
        );
        return;
      }
      try {
        // Fetch all items from the 'Header' collection
        const response = await directus.request(readItems("HeroContents"));
        setContentData(response as HeroContent[]); // Ensure we handle empty responses gracefully
      } catch (error) {
        console.error("Error fetching navigation items:", error);
      }
    }

    fetchHeroContents();
  }, [apiUrl]);
  //console.log(contentData);

  return (
    <>
      {contentData.length > 0 ? (
        <div className="flex w-[80%] p-10  flex-col justify-around items-center md:flex-row  gap-4">
          {contentData.map((item) => (
            <div key={item.id} className="text-white text-center uppercase">
              <h1 className="text-2xl font-semibold">{item.title}</h1>
              <p className="text-sm font-light">{item.subTitle}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>Loading...</p> // Show a loading indicator while fetching data
      )}
    </>
  );
}
