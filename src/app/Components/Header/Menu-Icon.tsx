"use client";

import { useState } from "react";
import Image from "next/image";
import NavItems from "./Nav-items";

export default function MenuIcon() {
  const [isNavVisible, setIsNavVisible] = useState(false);

  const toggleNav = () => {
    setIsNavVisible((prev) => !prev);
  };

  const closeNav = () => {
    setIsNavVisible(false);
  };

  //console.log(isNavVisible);

  return (
    <div className="relative">
      {/* Menu Icon */}
      <div className="flex md:hidden" onClick={toggleNav}>
        <Image
          src="/menu-icon.svg"
          alt="Nav Menu"
          width={100}
          height={100}
          className="w-auto h-auto cursor-pointer"
        />
      </div>

      {/* Conditional Rendering of NavItems */}
      {isNavVisible && (
        <div
          className="fixed inset-0 flex items-center justify-center  z-50"
          onClick={closeNav}
        >
          <div className="bg-black p-4 rounded-xl bg-opacity-60 backdrop-blur shadow-lg">
            <NavItems />
          </div>
        </div>
      )}
    </div>
  );
}
