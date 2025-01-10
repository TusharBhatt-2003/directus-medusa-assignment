"use client";
import { useState, useEffect } from "react";
import Categories from "../../Components/Accessories/Categories/Categories";
import { FiChevronDown } from "react-icons/fi";
import ProductCard from "../../Components/Accessories/ProductCard/ProductCard";
import directus from "@/directus/client";
import { readItems } from "@directus/sdk";

interface ProductData {
  id: string;
  productName: string;
  productDesc: string;
  productPrice: number;
  productCategory: number;
  productImages: string[];
}

interface ProductDataFile {
  ProductData_id: string; // Corresponding product ID
  directus_files_id: string;
}

export default function Page() {
  const [productData, setProductData] = useState<ProductData[]>([]);
  const [productFiles, setProductFiles] = useState<ProductDataFile[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null); // Track the selected category
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

  //console.log(productFiles);

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

  return (
    <div className="container bg-[#FAFAFA] py-20">
      <Categories setSelectedCategory={setSelectedCategory} />
      <main className="md:m-10">
        <div className="flex my-5 justify-between">
          <h1 className="uppercase text-xl font-semibold"></h1>
          <div className="flex gap-2 items-center">
            <p className="text-[#737373]">Sort by:</p>
            <p className="font-semibold flex items-center">
              Recommendation
              <FiChevronDown className="ml-2" />
            </p>
          </div>
        </div>
        <div className="py-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filteredProducts.map((product) => {
            const image = getImage(product.id);
            return (
              <ProductCard
                id={product.id}
                key={product.id}
                image={image ? `${apiUrl}/assets/${image}` : ""}
                title={product.productName}
                description={product.productDesc}
                price={product.productPrice}
              />
            );
          })}
        </div>
      </main>
    </div>
  );
}
