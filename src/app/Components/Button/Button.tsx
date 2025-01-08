import React from "react";
import Image from "next/image";

interface ButtonProps {
  text: string; // The button text
  icon?: boolean; // Whether to show an icon
  onClick?: () => void; // Optional onClick handler
}

export default function Button({ text, icon = false, onClick }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className="flex w-full justify-center items-center uppercase gap-2 px-4 py-2 bg-[#107C11] hover:bg-[#046a06] text-white rounded-lg shadow-md  focus:outline-none"
    >
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
    </button>
  );
}
