import { useState, useEffect } from "react";
import Button from "../Button/Button";
import { useRegion } from "@/app/Context/RegionContext";

interface Price {
  amount: string;
  currency_code: string;
}

interface Variant {
  id: string;
  title: string;
  prices: Price[];
}

interface Product {
  id: string;
  handle: string;
  variants: Variant[];
}

interface OptionsProps {
  id: string;
  slug: string;
}

const Options: React.FC<OptionsProps> = ({ id }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [cartState, setCartState] = useState<{ [key: string]: number }>({});
  const [addedToCartState, setAddedToCartState] = useState<{
    [key: string]: boolean;
  }>({});
  const region = useRegion();
  //console.log("Region", region.region?.currency_code);

  //console.log(id);
  const handle = id;
  useEffect(() => {
    fetch(`http://localhost:9000/admin/products?handle=${handle}`, {
      credentials: "include",
      headers: {
        "x-publishable-api-key":
          process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || "",
      },
    })
      .then((res) => res.json())
      .then(({ products }) => {
        if (!products.length) return; // Product with the specified handle doesn't exist
        setProducts(products); // Set products in state
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, [handle]);
  //console.log(products[0]);

  const addToCart = (optionId: string) => {
    setCartState((prevState) => ({ ...prevState, [optionId]: 1 }));
    setAddedToCartState((prevState) => ({ ...prevState, [optionId]: true }));
  };

  const increment = (optionId: string) => {
    setCartState((prevState) => ({
      ...prevState,
      [optionId]: (prevState[optionId] || 0) + 1,
    }));
  };

  const decrement = (optionId: string) => {
    setCartState((prevState) => {
      const newCount = prevState[optionId] - 1;
      if (newCount <= 0) {
        const updatedState = { ...prevState };
        delete updatedState[optionId];
        return updatedState;
      }
      return { ...prevState, [optionId]: newCount };
    });
  };

  if (!products.length || !products[0]?.variants?.length) return null;

  return (
    <div className="space-y-5 rounded-lg my-5">
      <p className="text-gray-600 font-semibold">Options</p>
      {products[0]?.variants.map((variant, index) => (
        <div
          key={index}
          className="flex lg:flex-row flex-col items-center justify-between gap-2"
        >
          <div className="flex justify-between lg:w-[60%] w-full border rounded-md px-4 py-2">
            <p className="font-semibold">{variant.title}</p>
            {variant.prices
              .filter(
                (price) => price.currency_code === region.region?.currency_code,
              )
              .map((price, index) => (
                <p key={index} className="font-semibold uppercase">
                  ${price.amount} {price.currency_code}
                </p>
              ))}
          </div>
          <div className="lg:w-[40%] w-full">
            {cartState[variant.id] ? (
              <div className="flex justify-around lg:justify-between items-center space-x-2 border rounded-md md:p-1 py-5">
                <button
                  onClick={() => decrement(variant.id)}
                  className="w-8 h-8 flex items-center justify-center bg-gray-200 text-gray-700 font-bold rounded-lg"
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <span className="font-medium">{cartState[variant.id]}</span>
                <button
                  onClick={() => increment(variant.id)}
                  className="w-8 h-8 flex items-center justify-center bg-green-600 text-white font-bold rounded-lg"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
            ) : (
              <>
                <Button
                  onClick={() => addToCart(variant.id)}
                  text="Add to Cart"
                  cart={true}
                />
                {cartState[variant.id] === 0 &&
                  addedToCartState[variant.id] && (
                    <p className="text-green-600 mt-2">Added to Cart</p>
                  )}
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Options;
