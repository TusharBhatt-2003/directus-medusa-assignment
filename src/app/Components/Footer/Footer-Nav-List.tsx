"use client";

import { useEffect, useState } from "react";
import { readItems } from "@directus/sdk";
import Link from "next/link";
import directus from "@/directus/client";

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

  // Utility function to capitalize the first letter of a string
  function capitalizeFirstLetter(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  useEffect(() => {
    async function fetchNavItems() {
      if (!apiUrl) {
        console.error(
          "NEXT_PUBLIC_DIRECTUS_API_URL is not set in environment variables",
        );
        return;
      }
      try {
        // Fetch all items from the 'FooterNavHeading' and 'FooterNavList' collections
        const [headingResponse, listResponse] = await Promise.all([
          directus.request(readItems("FooterNavHeading")),
          directus.request(readItems("FooterNavList")),
        ]);

        setNavHeading(headingResponse as NavHeadingData[]);
        setNavList(listResponse as NavListData[]);
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
            <nav
              key={heading.id}
              className="flex capitalize flex-col space-y-2"
            >
              <h2 className="text-xl font-bold">{heading.Heading}</h2>
              <ul>
                {navList
                  .filter((item) => item.navlist === heading.id)
                  .map((item) => (
                    <li key={item.id}>
                      <Link
                        href={`/${capitalizeFirstLetter(item.slug)}`}
                        className="hover:font-semibold"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
              </ul>
            </nav>
          ))
        ) : (
          <p>No navigation headings found</p>
        )}
      </div>
    </div>
  );
}
