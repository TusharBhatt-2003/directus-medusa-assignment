import Button from "../Button/Button";

interface ProductDetailsProps {
  category?: string;
  productName: string;
  productPrice: string;
  productDiscount: string;
  productDesc: string;
}
export default function ProductDetails({
  category,
  productName,
  productPrice,
  productDiscount,
  productDesc,
}: ProductDetailsProps) {
  return (
    <>
      <div className="w-full flex flex-col justify-center space-y-1 py-5 lg:p-5 border-b">
        <p className="uppercase text-[#107C11] font-semibold">{category}</p>
        <h1 className="uppercase text-xl font-bold">{productName}</h1>
        <p className="font-semibold">
          $280.00{" "}
          <span className="text-red-600 font-normal">
            save {productDiscount}
          </span>
        </p>
        <p className="text-sm text-[#737373]">{productDesc}</p>
      </div>
    </>
  );
}
