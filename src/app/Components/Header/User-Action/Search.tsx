import Image from "next/image";

export default function Search() {
  return (
    <div>
      <Image
        src="/search.svg"
        alt="Search"
        width={150}
        height={150}
        className="h-auto w-auto"
      />
    </div>
  );
}
