"use client";
import { useState, useEffect } from "react";
import { useProductContext } from "../Context/ProductContext";
import { readItems } from "@directus/sdk";
import directus from "@/directus/client";
import ProductListCard from "../Components/Cart/ProductListcard";
import OrderSummary from "../Components/Cart/OrderSummary";
import PaymentMethods from "../Components/Footer/Payment-Methods";
import ExpressCheckout from "../Components/Cart/ExpressCheckout";

interface ProductData {
  id: string;
  productName: string;
  productDesc: string;
  productPrice: number;
  productCategory: number;
  productImages: string[];
}

interface ProductDataFile {
  ProductData_id: string;
  directus_files_id: string;
}

export default function Page() {
  const { productIDs, removeProduct } = useProductContext();
  const [productData, setProductData] = useState<ProductData[]>([]);
  const [productFiles, setProductFiles] = useState<ProductDataFile[]>([]);
  const [productQuantities, setProductQuantities] = useState<{
    [key: string]: number;
  }>({});
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
        const productDataResponse = await directus.request(
          readItems("ProductData"),
        );
        setProductData(productDataResponse as ProductData[]);
      } catch (error) {
        console.error("Error fetching ProductData:", error);
      }

      try {
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

  function getFirstImage(productId: string): string | undefined {
    const productFile = productFiles.find(
      (file) => file.ProductData_id === productId,
    );
    if (productFile) {
      return `${apiUrl}/assets/${productFile.directus_files_id}`;
    }
    return undefined;
  }

  const filteredProductData = productData.filter((product) =>
    productIDs.includes(product.id),
  );

  const handleIncrement = (productId: string) => {
    setProductQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: (prevQuantities[productId] || 1) + 1,
    }));
  };

  const handleDecrement = (productId: string) => {
    setProductQuantities((prevQuantities) => {
      const currentQuantity = prevQuantities[productId] || 1;
      if (currentQuantity > 1) {
        return {
          ...prevQuantities,
          [productId]: currentQuantity - 1,
        };
      }
      return prevQuantities;
    });
  };

  const handleDelete = (productId: string) => {
    setProductQuantities((prevQuantities) => {
      const newQuantities = { ...prevQuantities };
      delete newQuantities[productId];
      return newQuantities;
    });
    removeProduct(productId);
  };

  const totalPrice = filteredProductData.reduce((total, product) => {
    // Remove commas and convert price to a number
    const price = parseFloat(product.productPrice.replace(/,/g, ""));
    const quantity = productQuantities[product.id] || 1; // Default quantity is 1
    return total + price * quantity;
  }, 0);

  return (
    <div className="container bg-[#FAFAFA] h-full py-20">
      <h1 className="text-xl font-semibold">MY CART</h1>
      <div className="flex w-full md:flex-row flex-col h-full">
        <div className="md:w-[60%] h-full p-4">
          {filteredProductData.length > 0 ? (
            <div>
              {filteredProductData.map((product) => {
                const quantity = productQuantities[product.id] || 1;
                return (
                  <ProductListCard
                    key={product.id}
                    product={product}
                    quantity={quantity}
                    onIncrement={() => handleIncrement(product.id)}
                    onDecrement={() => handleDecrement(product.id)}
                    onDelete={() => handleDelete(product.id)}
                    getFirstImage={getFirstImage}
                  />
                );
              })}
            </div>
          ) : (
            <p className="text-center text-xl font-semibold w-full">
              No products added to the cart
            </p>
          )}
        </div>
        <div className="md:w-[40%] space-y-5 h-full p-4">
          <OrderSummary
            itemsNumber={filteredProductData.length}
            totalSavings={2} // You can dynamically calculate savings if needed
            shipping="FREE" // Modify shipping cost dynamically if needed
            totalIncGst={totalPrice}
          />
          <hr className="border-t" />
          <ExpressCheckout />
          <hr className="border-t" />
          <PaymentMethods />
        </div>
      </div>
    </div>
  );
}
