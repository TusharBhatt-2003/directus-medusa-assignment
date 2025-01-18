"use client";
import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";

interface ProductContextType {
  productIDs: string[];
  setProductID: (id: string) => void;
  removeProduct: (id: string) => void;
}
// Clear the localStorage before the layout renders
// if (typeof window !== "undefined") {
//   // Clear the entire localStorage (or remove specific items)
//   localStorage.clear();
// }
const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProductContext must be used within a ProductProvider");
  }
  return context;
};

interface ProductProviderProps {
  children: ReactNode;
}

export const ProductProvider: React.FC<ProductProviderProps> = ({
  children,
}) => {
  const [productIDs, setProductIDs] = useState<string[]>([]);

  // Load productIDs from localStorage on initial render
  useEffect(() => {
    const storedProductIDs = localStorage.getItem("productIDs");
    if (storedProductIDs) {
      setProductIDs(JSON.parse(storedProductIDs));
    }
  }, []);

  // Save productIDs to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("productIDs", JSON.stringify(productIDs));
  }, [productIDs]);

  const addProductID = (id: string) => {
    setProductIDs((prevIDs) => [...prevIDs, id]);
  };

  const removeProduct = (id: string) => {
    setProductIDs((prevIDs) => prevIDs.filter((productId) => productId !== id));
  };

  return (
    <ProductContext.Provider
      value={{ productIDs, setProductID: addProductID, removeProduct }}
    >
      {children}
    </ProductContext.Provider>
  );
};
