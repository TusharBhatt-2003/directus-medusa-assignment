import React from "react";
import Button from "../Button/Button";

export default function NewsLetterForm() {
  return (
    <div className="space-y-3 w-full">
      <h1 className="font-bold">NEWSLETTER</h1>
      <input
        type="email"
        placeholder="Email"
        className="placeholder:text-[#A3A3A3] w-full px-2 py-1 border  outline-none rounded border-[#dbdada]"
      />
      <Button text="SUBSCRIBE" />
      <div className="flex gap-2 justify-center">
        <input type="checkbox" className="" />
        <p className="text-sm text-[#A3A3A3]">
          You agree to receive newsletters and marketing emails from MAVOK
        </p>
      </div>
    </div>
  );
}
