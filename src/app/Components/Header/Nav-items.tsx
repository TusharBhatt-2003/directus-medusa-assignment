"use client";
import { useEffect, useState } from "react";
import { readItems } from "@directus/sdk";
import Link from "next/link";
import directus from "@/directus/client";

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
      try {
        // Fetch all items from the 'Header' collection
        const response = await directus.request(readItems("Header"));
        setNavItems(response as NavItem[]);
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
            <li
              key={item.id}
              className="hover:font-semibold uppercase border-b md:border-none cursor-pointer"
            >
              <Link href={item.slug} className="hover:font-semibold">
                {item.navList}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading...</p>
      )}
    </nav>
  );
}
