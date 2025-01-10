"use client"; // Ensure this component runs on the client side

import React from "react";
import Logo from "./Logo";
import UserFunctions from "./User-Action/User-functions";
import MenuIcon from "./Menu-Icon";
import NavItems from "./Nav-items";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  return (
    <header
      className="p-5 border-b border-zinc-800 container back flex fixed right-0 left-0 justify-between items-center z-[99]"
      style={{
        filter: pathname === "/" ? "invert(0)" : "invert(1)",
      }}
    >
      <div className="flex">
        <Logo />
        <div className="md:block hidden">
          <NavItems />
        </div>
      </div>
      <div className="flex">
        <UserFunctions />
        <MenuIcon />
      </div>
    </header>
  );
}
