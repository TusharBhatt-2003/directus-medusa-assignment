import { FC } from "react";

interface OrderSummaryProps {
  itemsNumber: number;
  totalSavings: number;
  shipping: string;
  totalIncGst: number;
}

const OrderSummary: FC<OrderSummaryProps> = ({
  itemsNumber,
  totalSavings,
  shipping,
  totalIncGst,
}) => {
  return (
    <div className="bg-white p-4 rounded-lg space-y-4">
      <h2 className="text-lg font-bold">ORDER SUMMARY</h2>
      <hr className="border-t" />
      <div className="flex justify-between items-center text-sm">
        <span className="text-[#737373] font-semibold">
          {itemsNumber} items
        </span>
        <span className="font-semibold">${itemsNumber * 244}.00</span>{" "}
        {/* Example price logic */}
      </div>
      <div className="flex justify-between items-center text-sm">
        <span className="text-[#737373] font-semibold">Total Savings</span>
        <span className="text-red-500">-${totalSavings.toFixed(2)}</span>
      </div>
      <div className="flex justify-between items-center text-sm">
        <span className="text-[#737373] font-semibold">Shipping</span>
        <span className="font-semibold">{shipping}</span>
      </div>
      <hr className="border-t" />
      <div className="flex justify-between items-center text-lg font-bold">
        <span>Total (Inc. GST)</span>
        <span>${totalIncGst.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default OrderSummary;
