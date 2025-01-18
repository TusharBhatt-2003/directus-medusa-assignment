"use client";
import { useState, useEffect } from "react";
import Categories from "../../Components/Accessories/Categories/Categories";
import ProductCard from "../../Components/Accessories/ProductCard/ProductCard";
import directus from "@/directus/client";
import { readItems } from "@directus/sdk";
import { useParams } from "next/navigation";
import gsap from "gsap"; // Import GSAP
import { FiChevronDown } from "react-icons/fi"; // Chevron for dropdown

interface ProductData {
  id: string;
  productName: string;
  productDesc: string;
  productPrice: number;
  productCategory: number;
  productImages: string[];
  slug: string;
}

interface ProductDataFile {
  ProductData_id: string; // Corresponding product ID
  directus_files_id: string;
}

export default function Page() {
  const [productData, setProductData] = useState<ProductData[]>([]);
  const [productFiles, setProductFiles] = useState<ProductDataFile[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null); // Track the selected category
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc"); // State for sorting order
  const [dropdownOpen, setDropdownOpen] = useState(false); // State to track the dropdown visibility
  const { category } = useParams(); // Get the current category from the route
  const apiUrl = process.env.NEXT_PUBLIC_DIRECTUS_API_URL;

  useEffect(() => {
    async function fetchProductData() {
      if (!apiUrl) {
        console.error(
          "NEXT_PUBLIC_DIRECTUS_API_URL is not set in environment variables",
        );
        return;
      }

      try {
        // Fetch all items from the 'ProductData' collection
        const productDataResponse = await directus.request(
          readItems("ProductData"),
        );
        setProductData(productDataResponse as ProductData[]);
      } catch (error) {
        console.error("Error fetching ProductData:", error);
      }

      try {
        // Fetch all items from the 'ProductData_files' collection
        const productFilesResponse = await directus.request(
          readItems("ProductData_files"),
        );
        setProductFiles(productFilesResponse as ProductDataFile[]);
      } catch (error) {
        console.error("Error fetching ProductData_file:", error);
      }
    }

    fetchProductData();
  }, [apiUrl]);

  // Function to get the directus_files_id for the product images
  function getImage(productId: string): string | undefined {
    const matchingFile = productFiles.find(
      (file) => file.ProductData_id === productId,
    );
    return matchingFile?.directus_files_id;
  }

  // Function to filter products by the selected category
  const filteredProducts = selectedCategory
    ? productData.filter(
        (product) => product.productCategory === selectedCategory,
      )
    : productData;

  // Sort products based on the selected sort order
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOrder === "asc") {
      return a.productPrice - b.productPrice; // Ascending order
    } else {
      return b.productPrice - a.productPrice; // Descending order
    }
  });

  // Convert the category parameter to a readable string
  const categorySlug = Array.isArray(category)
    ? category.join(" / ")
    : category;

  useEffect(() => {
    // Animate product cards after they are loaded
    gsap.fromTo(
      ".product-card", // Target all product cards
      { opacity: 0, y: 20, scale: 0 }, // Initial state
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        stagger: 0.1, // Delay between each card's animation
        ease: "elastic(2, 1.5)", // Easing function for smooth transition
      },
    );
  }, [sortedProducts]); // Trigger animation when sorted products change

  // Handle sort change
  const handleSortChange = (option: "asc" | "desc") => {
    setSortOrder(option);
    setDropdownOpen(false); // Close the dropdown after selection
  };

  return (
    <div className="container bg-[#FAFAFA] py-20">
      <Categories setSelectedCategory={setSelectedCategory} />
      <main className="md:m-10">
        <div className="flex my-5 justify-between">
          <h1 className="uppercase text-xl font-semibold">{categorySlug}</h1>
          <div className="flex gap-2 items-center">
            <p className="text-[#737373]">Sort by:</p>
            {/* Custom Dropdown Select */}
            <div className="relative">
              <button
                className="p-2 rounded-md flex items-center"
                onClick={() => setDropdownOpen(!dropdownOpen)} // Toggle dropdown visibility
              >
                <span className="mr-2">
                  {sortOrder === "asc"
                    ? "Price: Low to High"
                    : "Price: High to Low"}
                </span>
                <FiChevronDown />
              </button>
              {/* Dropdown Menu */}
              {dropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-full bg-white border-2 border-[#107C11] rounded-lg shadow-lg z-10">
                  <ul className="text-sm text-gray-600 rounded-md overflow-hidden">
                    <li
                      className={`px-4 py-2  cursor-pointer ${sortOrder === "asc" ? "bg-[#107C11] text-white" : "hover:bg-gray-100"}`}
                      onClick={() => handleSortChange("asc")}
                    >
                      Price: Low to High
                    </li>
                    <li
                      className={`px-4 py-2 cursor-pointer ${sortOrder === "desc" ? "bg-[#107C11] text-white" : "hover:bg-gray-100"}`}
                      onClick={() => handleSortChange("desc")}
                    >
                      Price: High to Low
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="py-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {sortedProducts.map((product) => {
            const image = getImage(product.id);
            return (
              <div className="product-card" key={product.id}>
                <ProductCard
                  slug={product.slug}
                  id={product.id}
                  image={image ? `${apiUrl}/assets/${image}` : ""}
                  title={product.productName}
                  description={product.productDesc}
                  price={product.productPrice}
                />
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
