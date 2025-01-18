import React from "react";

const ExpressCheckout = () => {
  return (
    <div className=" p-4 rounded-lg">
      <h2 className="text-lg font-medium text-[#A3A3A3] mb-4">
        Express Checkout
      </h2>
      <div className="flex flex-col gap-3">
        {/* PayPal Button */}
        <button className="flex bg-white items-center shadow border justify-center gap-2  font-semibold py-2 px-4 rounded-lg">
          <img
            src="/paypal.svg" // Replace with the actual PayPal logo URL or path
            alt="PayPal Logo"
            className="h-5 w-5"
          />
          PAYPAL
        </button>
        {/* Amazon Pay Button */}
        <button className="flex  bg-white items-center shadow border justify-center gap-2  font-semibold py-2 px-4 rounded-lg">
          <img
            src="/amazon.svg" // Replace with the actual Amazon logo URL or path
            alt="Amazon Pay Logo"
            className="h-5 w-5"
          />
          AMAZON PAY
        </button>
      </div>
    </div>
  );
};

export default ExpressCheckout;
