import React from "react";
import Button from "../../Button/Button";
import Link from "next/link";

interface ProductCardProps {
  id: string;
  image: string;
  title: string;
  description: string;
  price: number;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  image,
  title,
  description,
  price,
}) => {
  return (
    <div className="bg-white flex flex-col justify-between space-y-5 p-2 md:p-5 rounded-lg hover:shadow-lg transition-all duration-300">
      <div>
        <Link href={`/product/${id}`}>
          <img
            src={image}
            alt={title}
            className="w-full h-[200px] object-contain" // Set image size as per your design
          />
        </Link>
        <div>
          <p className="uppercase font-bold">{title}</p>
          <p className="text-[#737373] text-sm">{description}</p>
        </div>
      </div>
      <div className="space-y-5">
        <p className="font-bold">FROM ${price}</p>
        <Button text="Add to Cart" />
      </div>
    </div>
  );
};

export default ProductCard;
