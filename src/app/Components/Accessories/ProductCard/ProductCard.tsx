import React, { useState } from "react";
import Button from "../../Button/Button";
import Link from "next/link";
import { motion } from "framer-motion"; // Correct the import for motion

interface ProductCardProps {
  id: string;
  image: string;
  title: string;
  description: string;
  price: number;
  slug: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  slug,
  id,
  image,
  title,
  description,
  price,
}) => {
  const [addedToCart, setAddedToCart] = useState(false); // State to track if product is added to cart

  const handleAddToCart = () => {
    setAddedToCart(true); // Set to true when the button is clicked
  };

  return (
    <div className="bg-white h-full flex flex-col justify-between space-y-5 p-2 md:p-5 rounded-lg hover:shadow-lg transition-all duration-300">
      <div className="">
        <div className="overflow-hidden rounded-lg">
          <Link href={`/product/${slug}`}>
            <motion.img
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.5 }}
              src={image}
              alt={title}
              className="w-full h-[200px] object-contain rounded-lg"
            />
          </Link>
        </div>
        <div>
          <p className="uppercase font-bold">{title}</p>
          <p className="text-[#737373] text-sm">{description}</p>
        </div>
      </div>
      <div className="space-y-5">
        <p className="font-bold">FROM ${price}</p>
        {!addedToCart ? (
          <Button productID={id} onClick={handleAddToCart} text="Add to Cart" />
        ) : (
          <motion.p
            className="w-full text-center px-4 py-2 text-[#107C11] border-[#107C11] border rounded-md"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            Added to Cart
          </motion.p>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
