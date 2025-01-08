import Image from "next/image";

export default function Cart() {
  return (
    <div>
      <Image
        src="/cart.svg"
        alt="cart"
        width={100}
        height={100}
        className="h-auto w-auto"
      />
    </div>
  );
}
