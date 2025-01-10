"use client";
import { useEffect, useState } from "react";
import directus from "@/directus/client";
import { readItems } from "@directus/sdk";

interface categories {
  id: number;
  Category: string;
  categoryImg?: string;
}

interface CategoriesProps {
  setSelectedCategory: (categoryId: number | null) => void; // Prop to set selected category
}

export default function Categories({ setSelectedCategory }: CategoriesProps) {
  const [categories, setCategories] = useState<categories[]>([]);
  const apiUrl = process.env.NEXT_PUBLIC_DIRECTUS_API_URL as string;

  useEffect(() => {
    async function fetchCatData() {
      try {
        const response = await directus.request(readItems("Categories"));
        if (Array.isArray(response as categories[])) {
          // Prepend the "All" category
          const allCategory = { id: 0, Category: "All", categoryImg: "" };
          setCategories([allCategory, ...(response as categories[])]);
        } else {
          setCategories([]);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
        setCategories([]);
      }
    }
    fetchCatData();
  }, [apiUrl]);

  return (
    <div className="flex overflow-x-scroll scroll-smooth hide-scrollbar gap-2 w-full justify-center items-center border-b bg-white">
      {categories.map((category) => (
        <div
          key={category.id}
          onClick={() => setSelectedCategory(category.id)} // Update the selected category
          className={`p-5 md:p-10 w-52 flex flex-col justify-between text-center items-center uppercase font-semibold hover:bg-[#FAFAFA] rounded-lg cursor-pointer`}
        >
          {category.categoryImg ? (
            <img
              src={`${apiUrl}/assets/${category.categoryImg}`}
              alt={category.Category}
              className="w-14  object-contain"
            />
          ) : (
            <img
              src="/productImg.png"
              alt="All Categories"
              className="w-14  object-contain"
            />
          )}
          <h3>{category.Category}</h3>
        </div>
      ))}
    </div>
  );
}
