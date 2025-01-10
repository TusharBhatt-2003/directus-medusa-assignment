"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { readItems } from "@directus/sdk";
import directus from "@/directus/client";
import ProductDetails from "@/app/Components/Product/ProductDetails";
import ProductImages from "@/app/Components/Product/ProductImages";
import CustomerService from "@/app/Components/Product/CustomerService";

interface ProductData {
  id: number;
  productName: string;
  productDesc: string;
  productPrice: string;
  productCategory: number;
  productImages: number[];
}

interface ProductDataFile {
  ProductData_id: number; // Corresponding product ID
  directus_files_id: string;
}

interface Categories {
  id: number;
  Category: string;
  categoryImg?: string;
}

export default function Page() {
  const { slug } = useParams(); // Get slug from the URL
  const [productData, setProductData] = useState<ProductData[]>([]);
  const [productFiles, setProductFiles] = useState<ProductDataFile[]>([]);
  const [currentProduct, setCurrentProduct] = useState<ProductData | null>(
    null,
  );
  const [productImageIds, setProductImageIds] = useState<string[]>([]); // State to store the product image IDs
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
        const allProducts = productDataResponse as ProductData[];

        setProductData(allProducts); // Store all products in the state

        // Convert slug to number for comparison
        const slugAsNumber = Number(slug);

        // Find the product matching the slug
        const matchedProduct = allProducts.find(
          (product) => product.id === slugAsNumber,
        );
        setCurrentProduct(matchedProduct || null); // Update the matched product
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
  }, [apiUrl, slug]);

  useEffect(() => {
    if (currentProduct) {
      // Match the ProductData_id with the currentProduct's id and collect the directus_files_id
      const matchedFileIds = productFiles
        .filter((file) => file.ProductData_id === currentProduct.id)
        .map((file) => file.directus_files_id);

      setProductImageIds(matchedFileIds); // Store the file IDs in state
    }
  }, [currentProduct, productFiles]);

  const [categories, setCategories] = useState<Categories[]>([]);

  useEffect(() => {
    async function fetchCatData() {
      if (!apiUrl) {
        console.error(
          "NEXT_PUBLIC_DIRECTUS_API_URL is not set in environment variables",
        );
        return;
      }

      try {
        // Fetch all items from the 'Categories' collection
        const allCategory = await directus.request(readItems("Categories"));
        setCategories(allCategory as Categories[]);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }

    fetchCatData();
  }, [apiUrl]);

  // Find the category name that matches the product's category id
  const matchedCategory = categories.find(
    (cat) => cat.id === currentProduct?.productCategory,
  );

  //console.log(matchedCategory);

  //console.log(productImageIds);

  if (!currentProduct) {
    return (
      <p className="text-center py-20">
        Loading product details for "{slug}"...
      </p>
    );
  }

  return (
    <div className="container h-full bg-white py-20">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="h-full">
          {/* Pass the product image IDs to the ProductImages component */}
          <ProductImages imageIds={productImageIds} />
        </div>
        <div className="h-full px-5">
          <ProductDetails
            category={matchedCategory?.Category}
            productName={currentProduct.productName}
            productPrice={currentProduct.productPrice}
            productDiscount="25% or $200"
            productDesc={currentProduct.productDesc}
          />
          <CustomerService />
        </div>
      </div>
    </div>
  );
}
