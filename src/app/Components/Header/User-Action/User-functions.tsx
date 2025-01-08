import Cart from "./Cart";
import Profile from "./Profile";
import Search from "./Search";

export default function UserFunctions() {
  return (
    <div className="flex px-5 md:px-10 gap-5 ">
      <Search />
      <Profile />
      <Cart />
    </div>
  );
}
