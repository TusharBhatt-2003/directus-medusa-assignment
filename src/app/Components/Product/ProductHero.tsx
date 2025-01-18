import React from "react";
import HeadingDescription from "../Heading-Description/Heading-Description";

interface ProductHeroProps {
  subtitle: string;
  heading: string;
  desc: string;
  imageIds: string[]; // Accept image IDs as a prop
}

export default function ProductHero({
  subtitle,
  heading,
  desc,
  imageIds,
}: ProductHeroProps) {
  // Helper function to generate image URLs
  const getImageUrl = (id: string) => {
    const apiUrl = process.env.NEXT_PUBLIC_DIRECTUS_API_URL;
    return `${apiUrl}/assets/${id}`;
  };

  return (
    <div className="bg-[#FAFAFA] py-10 my-10">
      <HeadingDescription
        subtitle={subtitle}
        heading={heading}
        desc={desc}
        className="text-center"
      />
      <div className="flex flex-col gap-6 w-full my-10">
        {/* First Image */}
        <div className="h-80 w-full rounded-lg overflow-hidden hover:bg-white">
          {imageIds[0] && (
            <img
              src={getImageUrl(imageIds[0])}
              alt="Product Hero 1"
              className="h-full w-full object-contain"
            />
          )}
        </div>

        {/* Second Row with Two Images */}
        <div className="flex gap-6">
          {/* Second Image */}
          <div className="h-60 w-1/2 rounded-lg overflow-hidden hover:bg-white">
            {imageIds[1] && (
              <img
                src={getImageUrl(imageIds[1])}
                alt="Product Hero 2"
                className="h-full w-full object-contain"
              />
            )}
          </div>
          {/* Third Image */}
          <div className="h-60 w-1/2 rounded-lg overflow-hidden hover:bg-white">
            {imageIds[2] && (
              <img
                src={getImageUrl(imageIds[2])}
                alt="Product Hero 3"
                className="h-full w-full object-contain"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
