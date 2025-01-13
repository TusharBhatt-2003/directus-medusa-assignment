import { useState } from "react";
import Button from "../Button/Button";

export default function Options() {
  // State to manage the count for each option
  const [cartState, setCartState] = useState<{ [key: string]: number }>({});

  // Sample data for options
  const options = [
    { id: "1", name: "36 MIG TORCH A", price: "$1,999 AUD" },
    { id: "2", name: "36 MIG TORCH A", price: "$1,999 AUD" },
    { id: "3", name: "36 MIG TORCH A", price: "$1,999 AUD" },
  ];

  // Function to add item to cart (shows counter)
  const addToCart = (id: string) => {
    setCartState((prevState) => ({ ...prevState, [id]: 1 }));
  };

  // Function to increase quantity
  const increment = (id: string) => {
    setCartState((prevState) => ({
      ...prevState,
      [id]: prevState[id] + 1,
    }));
  };

  // Function to decrease quantity
  const decrement = (id: string) => {
    setCartState((prevState) => {
      const newCount = prevState[id] - 1;
      if (newCount <= 0) {
        const updatedState = { ...prevState };
        delete updatedState[id];
        return updatedState;
      }
      return { ...prevState, [id]: newCount };
    });
  };

  return (
    <div className="space-y-5 rounded-lg my-5">
      <p className="text-[#737373] font-semibold">Options</p>
      {options.map((option) => (
        <div
          key={option.id}
          className="flex lg:flex-row flex-col items-center justify-between gap-2"
        >
          <div className="flex justify-between w-full border rounded-md px-4 py-2">
            <p className="font-semibold">{option.name}</p>
            <p className="font-semibold">{option.price}</p>
          </div>
          <div className="w-full">
            {cartState[option.id] ? (
              <div className="flex justify-around items-center space-x-2 border rounded-md md:p-2 py-5">
                <button
                  onClick={() => decrement(option.id)}
                  className="w-8 h-8 flex items-center justify-center bg-[#FAFAFA] text-gray-700 font-bold rounded-lg"
                >
                  −
                </button>
                <span className="font-medium">{cartState[option.id]}</span>
                <button
                  onClick={() => increment(option.id)}
                  className="w-8 h-8 flex items-center justify-center bg-[#107C11] text-white font-bold rounded-lg"
                >
                  +
                </button>
              </div>
            ) : (
              <Button
                onClick={() => addToCart(option.id)}
                text="add to cart"
                cart={true}
              />
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
