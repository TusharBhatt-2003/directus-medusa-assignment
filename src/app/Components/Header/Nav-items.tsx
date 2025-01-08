"use client";

import { useEffect, useState } from "react";
import { createDirectus, rest, readItems } from "@directus/sdk";
import Link from "next/link";

// Define the structure of the NavItem data
interface NavItem {
  id: string;
  navList: string;
  slug: string;
}

export default function NavItems() {
  const [navItems, setNavItems] = useState<NavItem[]>([]);
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
        // Fetch all items from the 'Header' collection
        const response = await directus.request(readItems<NavItem[]>("Header"));
        setNavItems(response || []); // Ensure we handle empty responses gracefully
      } catch (error) {
        console.error("Error fetching navigation items:", error);
      }
    }

    fetchNavItems();
  }, [apiUrl]);

  //console.log('navlist: ', navItems);

  return (
    <nav className="items-center px-10 justify-between text-white">
      {navItems.length > 0 ? (
        <ul className="flex flex-col justify-center items-center md:flex-row  gap-4">
          {navItems.map((item) => (
            <li key={item.id} className="hover:font-semibold cursor-pointer">
              <Link href={item.slug}>{item.navList}</Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading...</p> // Show a loading indicator while fetching data
      )}
    </nav>
  );
}
