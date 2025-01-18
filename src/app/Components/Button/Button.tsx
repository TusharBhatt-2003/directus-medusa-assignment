"use client";
import React from "react";
import Image from "next/image";
import { useProductContext } from "@/app/Context/ProductContext";
import { motion } from "motion/react";

interface ButtonProps {
  productID?: string;
  cart?: boolean;
  text: string; // The button text
  icon?: boolean; // Whether to show an icon
  onClick?: () => void; // Optional onClick handler
}

const Button: React.FC<ButtonProps> = ({
  productID,
  cart,
  text,
  icon = false,
  onClick,
}) => {
  const { setProductID } = useProductContext(); // Access the context to set the productID

  const handleClick = () => {
    if (productID) {
      setProductID(productID); // Update the context with the productID
      console.log(productID); // Log the productID to check it
    }
    if (onClick) onClick(); // Call the onClick handler if provided
  };

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.55 }}
      onClick={handleClick}
      className="flex w-full justify-center items-center uppercase gap-2 px-4 py-2 bg-[#107C11] hover:bg-[#046a06] text-white rounded-lg shadow-md focus:outline-none"
    >
      {cart && (
        <Image
          src="/cart.svg" // Replace with your desired icon path
          alt="Icon"
          width={20}
          height={20}
          className="w-5 h-5"
        />
      )}
      {text}
      {icon && (
        <Image
          src="/arrowRight.svg" // Replace with your desired icon path
          alt="Icon"
          width={20}
          height={20}
          className="w-5 h-5"
        />
      )}
    </motion.button>
  );
};

export default Button;
