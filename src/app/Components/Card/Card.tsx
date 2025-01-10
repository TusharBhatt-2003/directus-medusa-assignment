import React from "react";

interface CardProps {
  id: string;
  icon: string;
  title: string;
  desc: string;
  apiUrl: string;
}

const Card: React.FC<CardProps> = ({ id, icon, title, desc, apiUrl }) => {
  return (
    <div
      key={id}
      className="text-white  bg-[#171717] rounded-lg flex flex-col justify-center text-center items-center px-10 md:px-0 py-10"
    >
      <img
        src={`${apiUrl}/assets/${icon}`}
        alt={title}
        width={80}
        height={80}
        className="h-auto w-auto rounded-lg"
      />
      <h2 className="uppercase font-semibold mt-4">{title}</h2>
      <p className="text-[#737373] md:px-20 w-[50vw] md:w-fit text-xs mt-2">
        {desc}
      </p>
    </div>
  );
};

export default Card;
