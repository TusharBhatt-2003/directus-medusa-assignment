"use client";
import React, { useEffect, useState } from "react";
import { readItems } from "@directus/sdk";
import HeadingDescription from "../Components/Heading-Description/Heading-Description";
import directus from "@/directus/client";
import Card from "../Components/Card/Card";

interface How_It_Works {
  id: string;
  heading: string;
  desc: string;
  file: string;
}

interface OurPromise {
  id: string;
  heading: string;
  desc: string;
}
interface OurPromisCard {
  id: string;
  title: string;
  desc: string;
  icon: string;
}

export default function ContentSection() {
  const [HIWdata, setHIWData] = useState<How_It_Works[]>([]);
  const [OPdata, setOPData] = useState<OurPromise[]>([]);
  const [OPCardData, setOPCardData] = useState<OurPromisCard[]>([]);
  const apiUrl = process.env.NEXT_PUBLIC_DIRECTUS_API_URL as string;

  useEffect(() => {
    async function fetchHIWData() {
      if (!apiUrl) {
        console.error(
          "NEXT_PUBLIC_DIRECTUS_API_URL is not set in environment variables",
        );
        return;
      }
      try {
        // Fetch all items from the 'Hero' collection
        const response = await directus.request(readItems("How_It_Works"));
        setHIWData(response as How_It_Works[]);
      } catch (error) {
        console.error("Error fetching hero data:", error);
      }
    }

    fetchHIWData();
  }, [apiUrl]);

  useEffect(() => {
    async function fetchOPData() {
      if (!apiUrl) {
        console.error(
          "NEXT_PUBLIC_DIRECTUS_API_URL is not set in environment variables",
        );
        return;
      }
      try {
        // Fetch all items from the 'Our Promise' collection
        const response = await directus.request(readItems("Our_Promise"));
        setOPData(response as How_It_Works[]);
      } catch (error) {
        console.error("Error fetching hero data:", error);
      }
    }

    fetchOPData();
  }, [apiUrl]);

  useEffect(() => {
    async function fetchOurpromisecards() {
      try {
        const response = await directus.request(readItems("Our_promise_cards"));
        setOPCardData(response as OurPromisCard[]);
      } catch (error) {
        console.error("Error fetching payment methods:", error);
      }
    }

    fetchOurpromisecards();
  }, [apiUrl]);

  //console.log(HIWdata);

  return (
    <div className="p-10 container h-full ">
      <section className="h-screen flex flex-col items-center justify-center w-full gap-10">
        <HeadingDescription
          className="text-center text-white space-y-2 md:w-[60%] "
          subtitle=""
          heading={HIWdata.heading}
          desc={HIWdata.desc}
        />
        <img
          src={`${apiUrl}/assets/${HIWdata.file}`}
          alt="how it works"
          width={100}
          height={100}
          className="h-auto m-5 w-auto rounded-lg"
        />
      </section>
      <section className="h-screen flex flex-col items-center justify-center w-full gap-10">
        <HeadingDescription
          className="text-center text-white space-y-2 md:w-[60%] "
          subtitle=""
          heading={OPdata.heading}
          desc={OPdata.desc}
        />
        <div className="flex w-full gap-10 md:gap-5 md:grid md:grid-cols-2 overflow-x-auto scroll-smooth hide-scrollbar">
          {OPCardData.map((card) => (
            <Card
              key={card.id}
              id={card.id}
              icon={card.icon}
              title={card.title}
              desc={card.desc}
              apiUrl={apiUrl}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
