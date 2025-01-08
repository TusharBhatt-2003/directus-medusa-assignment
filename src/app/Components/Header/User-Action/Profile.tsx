import Image from "next/image";

export default function Profile() {
  return (
    <div>
      <Image
        src="/profile.svg"
        alt="Profile"
        width={100}
        height={100}
        className="h-auto w-auto"
      />
    </div>
  );
}
