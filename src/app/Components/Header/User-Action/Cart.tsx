"use client";
import { useProductContext } from "@/app/Context/ProductContext";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useAnimation } from "framer-motion"; // Importing motion and useAnimation
import { useEffect } from "react";

export default function Cart() {
  const { productIDs } = useProductContext(); // Access the product IDs from context
  const pathname = usePathname();
  const controls = useAnimation(); // Create animation controls for batch icon

  // Trigger animation whenever productIDs change
  useEffect(() => {
    controls.start({ scale: 1.5 }); // Scale the icon up
    const timer = setTimeout(() => {
      controls.start({ scale: 1 }); // Scale it back down after a delay
    }, 300); // Delay to let the animation finish

    return () => clearTimeout(timer); // Clean up the timer
  }, [productIDs.length, controls]); // Depend on productIDs.length

  return (
    <Link href="/cart">
      <div className="relative">
        <Image
          src="/cart.svg"
          alt="cart"
          width={100}
          height={100}
          className="h-auto w-auto"
        />
        {productIDs.length > 0 && (
          <motion.div
            className="batch-icon absolute top-0 right-0 bg-[#107C11] text-white text-xs rounded-full w-4 h-4 p-2 flex items-center justify-center"
            style={{
              filter: pathname === "/" ? "invert(0)" : "invert(1)",
            }}
            animate={controls} // Bind the controls to the animation
            initial={{ scale: 0 }} // Start with no scale
            exit={{ scale: 0 }} // Shrink when it exits (optional)
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 15,
            }} // Smooth animation
          >
            {productIDs.length}
          </motion.div>
        )}
      </div>
    </Link>
  );
}
