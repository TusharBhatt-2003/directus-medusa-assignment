import React from "react";
import Logo from "./Logo";
import UserFunctions from "./User-Action/User-functions";
import MenuIcon from "./Menu-Icon";
import NavItems from "./Nav-items";

export default function Header() {
  return (
    <header className="p-5 container md:bg-transparent bg-[black]/60 back flex fixed right-0 left-0 justify-between items-center">
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
