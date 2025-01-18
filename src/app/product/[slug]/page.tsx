"use client"; // Added the use client directive

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { readItems } from "@directus/sdk";
import directus from "@/directus/client";
import ProductDetails from "@/app/Components/Product/ProductDetails";
import ProductImages from "@/app/Components/Product/ProductImages";
import CustomerService from "@/app/Components/Product/CustomerService";
import Button from "@/app/Components/Button/Button";
import Options from "@/app/Components/Product/Options";
import { motion } from "motion/react";
import ProductHero from "@/app/Components/Product/ProductHero";
import ProductSpecifications from "@/app/Components/Product/ProductSpecifications";

interface ProductData {
  slug: string;
  id: string;
  productName: string;
  productDesc: string;
  productPrice: string;
  productCategory: number;
  productImages: number[];
  ProductHeroSubtitle: string;
  ProductHeroHeading: string;
  ProductHeroDesc: string;
  specifications: string[];
}

interface ProductDataFile {
  ProductData_id: string; // Corresponding product ID
  directus_files_id: string;
}

interface ProductDataFile1 {
  ProductData_id: string; // Corresponding product ID
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
  const [productFiles1, setProductFiles1] = useState<ProductDataFile1[]>([]); // State for productdata_files_1
  const [currentProduct, setCurrentProduct] = useState<ProductData | null>(
    null,
  );
  const [productImageIds, setProductImageIds] = useState<string[]>([]); // State to store product image IDs
  const [productHeroImageIds, setProductHeroImageIds] = useState<string[]>([]); // State for ProductHero images
  const apiUrl = process.env.NEXT_PUBLIC_DIRECTUS_API_URL;

  const [addedToCart, setAddedToCart] = useState(false); // State to track if product is added to cart

  const handleAddToCart = () => {
    setAddedToCart(true); // Set to true when the button is clicked
  };

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

        // Find the product matching the slug
        const matchedProduct = allProducts.find(
          (product) => product.slug === slug,
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
        console.error("Error fetching ProductData_files:", error);
      }

      try {
        // Fetch all items from the 'ProductData_files_1' collection
        const productFiles1Response = await directus.request(
          readItems("ProductData_files_1"),
        );
        setProductFiles1(productFiles1Response as ProductDataFile1[]);
      } catch (error) {
        console.error("Error fetching ProductData_files_1:", error);
      }
    }

    fetchProductData();
  }, [apiUrl, slug]);
  //console.log("productfile1", productFiles1);

  useEffect(() => {
    if (currentProduct) {
      // Match the ProductData_id with the currentProduct's id and collect the directus_files_id
      const matchedFileIds = productFiles
        .filter((file) => file.ProductData_id === currentProduct.id)
        .map((file) => file.directus_files_id);

      setProductImageIds(matchedFileIds); // Store the file IDs in state

      // Match the ProductData_id with the currentProduct's id for productFiles1
      const matchedHeroFileIds = productFiles1
        .filter((file) => file.ProductData_id === currentProduct.id)
        .map((file) => file.directus_files_id);

      setProductHeroImageIds(matchedHeroFileIds); // Store the hero image IDs in state
    }
  }, [currentProduct, productFiles, productFiles1]);

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

  if (!currentProduct) {
    return (
      <p className="text-center py-20">
        Loading product details for "{slug}"...
      </p>
    );
  }

  return (
    <div className="container h-full bg-white py-20">
      <div className="flex w-full my-5 md:m-5 items-center gap-2 font-semibold">
        <p className="text-[#737373]">{matchedCategory?.Category}</p>
        <img src="/greaterThan.svg" alt="direction" />
        <p>{currentProduct.productName}</p>
      </div>
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
          <Options slug={currentProduct.slug} id={currentProduct.id} />
          <div className="bg-[#FAFAFA] space-y-2 p-5 rounded-lg my-5">
            <p className="font-bold text-xl">
              {currentProduct.productPrice} AUD
            </p>
            <p className="text-red-600 font-normal">
              <span className="font-semibold text-[#737373] text-sm line-through">
                {currentProduct.productPrice} AUD
              </span>{" "}
              save "25% or $200"
            </p>
            <p className="text-[#737373]">
              or $27.75/month with 36-month financing*, before trade-in
            </p>

            {!addedToCart ? (
              <Button
                text="Add to Cart"
                productID={currentProduct.id}
                onClick={handleAddToCart}
                cart={true}
              />
            ) : (
              <motion.p
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="text-center text-green-600 font-semibold mt-2"
              >
                Added to Cart
              </motion.p>
            )}
          </div>
          <CustomerService />
        </div>
      </div>
      {productHeroImageIds && productHeroImageIds.length > 0 && (
        <ProductHero
          subtitle={currentProduct.ProductHeroSubtitle}
          heading={currentProduct.ProductHeroHeading}
          desc={currentProduct.ProductHeroDesc}
          imageIds={productHeroImageIds}
        />
      )}
      {currentProduct.specifications &&
        currentProduct.specifications.length > 0 && (
          <ProductSpecifications
            heading={currentProduct.ProductHeroHeading}
            desc={currentProduct.ProductHeroDesc}
            specData={currentProduct.specifications}
          />
        )}
    </div>
  );
}
