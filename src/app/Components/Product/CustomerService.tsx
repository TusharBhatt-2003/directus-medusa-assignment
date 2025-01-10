import React from "react";
import PaymentMethods from "../Footer/Payment-Methods";

export default function CustomerService() {
  return (
    <div className="w-full md:m-5 text-sm text-[#737373]">
      <div className="flex items-center gap-2 border-t py-2">
        <img src="/smallTruck.svg" />
        <p>Estimated dispatch with 2-days Free Shipping</p>
      </div>
      <div className="flex items-center gap-2 border-t py-2">
        <img src="/ShieldCheck.svg" />
        <p>15-days return policy</p>
      </div>
      <div className="flex items-center gap-2 border-t py-2">
        <img src="/Headset.svg" />
        <p>Global support</p>
      </div>
      <div className="flex items-center gap-2 border-t py-2">
        <img src="/CreditCard.svg" />
        <p>Ways to pay</p>
      </div>
      <PaymentMethods />
    </div>
  );
}
