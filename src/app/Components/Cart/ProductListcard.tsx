"use client";
import { FC } from "react";

interface ProductListCardProps {
  product: {
    id: string;
    productName: string;
    productPrice: number;
    productImages: string[];
  };
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
  onDelete: () => void;
  getFirstImage: (productId: string) => string | undefined;
}

const ProductListCard: FC<ProductListCardProps> = ({
  product,
  quantity,
  onIncrement,
  onDecrement,
  onDelete,
  getFirstImage,
}) => {
  const firstImage = getFirstImage(product.id);

  return (
    <div
      key={product.id}
      className="my-4 bg-white p-3 rounded-lg w-full gap-5 flex"
    >
      {firstImage ? (
        <img
          src={firstImage}
          alt={`Image of ${product.productName}`}
          className="w-20 rounded-lg bg-[#F5F5F5]"
        />
      ) : (
        <p>No image available</p>
      )}
      <div className="w-full space-y-2">
        <div className="flex font-semibold justify-between">
          <h3>{product.productName}</h3>
          <p>${product.productPrice}</p>
        </div>
        <div className="flex font-semibold justify-between">
          <div className="flex justify-between items-center space-x-2 border rounded-lg p-1 py-3">
            <button
              onClick={onDecrement}
              className="w-8 h-8 flex items-center justify-center bg-[#FAFAFA] text-gray-700 font-bold rounded-lg"
            >
              −
            </button>
            <span className="font-medium mx-2">{quantity}</span>
            <button
              onClick={onIncrement}
              className="w-8 h-8 flex items-center justify-center bg-[#107C11] text-white font-bold rounded-lg"
            >
              +
            </button>
          </div>
          <button onClick={onDelete} className="text-red-500">
            <img src="/delete.svg" alt="Delete" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductListCard;
