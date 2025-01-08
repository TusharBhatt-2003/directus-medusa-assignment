"use client";

import { useEffect, useState } from "react";
import { createDirectus, rest, readItems } from "@directus/sdk";
import Link from "next/link";

interface FooterNavList {
  navList: NavListData[];
  navHeading: NavHeadingData[];
}

interface NavHeadingData {
  id: string;
  Heading: string;
}

interface NavListData {
  id: string;
  navlist: string;
  slug: string;
  name: string;
}

export default function FooterNavList() {
  const [navHeading, setNavHeading] = useState<NavHeadingData[]>([]);
  const [navList, setNavList] = useState<NavListData[]>([]);
  const apiUrl = process.env.NEXT_PUBLIC_DIRECTUS_API_URL;

  useEffect(() => {
    async function fetchNavItems() {
      if (!apiUrl) {
        console.error(
          "NEXT_PUBLIC_DIRECTUS_API_URL is not set in environment variables",
        );
        return;
      }

      const directus = createDirectus(apiUrl).with(rest());

      try {
        // Fetch all items from the 'FooterNavHeading' and 'FooterNavList' collections
        const [headingResponse, listResponse] = await Promise.all([
          directus.request(readItems<NavHeadingData[]>("FooterNavHeading")),
          directus.request(readItems<NavListData[]>("FooterNavList")),
        ]);

        setNavHeading(headingResponse || []); // Handle empty responses gracefully
        setNavList(listResponse || []); // Handle empty responses gracefully
      } catch (error) {
        console.error("Error fetching navigation items:", error);
      }
    }

    fetchNavItems();
  }, [apiUrl]);

  return (
    <div className="w-full">
      <div className="grid gap-5 grid-cols-2 lg:flex justify-between md:mr-10">
        {navHeading.length > 0 ? (
          navHeading.map((heading) => (
            <div
              key={heading.id}
              className="flex capitalize flex-col space-y-2"
            >
              <h2 className="text-xl font-bold">{heading.Heading}</h2>
              {/* You can now map through the associated navList for each heading */}
              <ul>
                {navList
                  .filter((item) => item.navlist === heading.id) // Assuming there's a relationship between heading and navlist
                  .map((item) => (
                    <li key={item.id}>
                      <Link href={item.slug} className="hover:font-semibold">
                        {item.name}
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          ))
        ) : (
          <p>No navigation headings found</p>
        )}
      </div>
    </div>
  );
}
