import React, { useState, useEffect } from "react";

interface ProductImagesProps {
  imageIds: string[]; // Define the prop type as an array of strings
}

export default function ProductImages({ imageIds }: ProductImagesProps) {
  const [currentImage, setCurrentImage] = useState<string>("");

  const apiUrl = process.env.NEXT_PUBLIC_DIRECTUS_API_URL;

  // Set the first image as default when imageIds change
  useEffect(() => {
    if (imageIds.length > 0) {
      setCurrentImage(imageIds[0]);
    }
  }, [imageIds]);

  // Function to handle thumbnail click
  const handleThumbnailClick = (imageId: string) => {
    setCurrentImage(imageId); // Update the large image when a thumbnail is clicked
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      {/* Large image display with fixed size */}
      {imageIds.length > 0 && (
        <div className="w-full bg-[#F5F5F5] rounded-lg max-w-[600px] h-[400px]">
          <img
            src={`${apiUrl}/assets/${currentImage}`}
            alt="Main Product Image"
            className="w-full h-full object-cover rounded-xl"
          />
        </div>
      )}

      {/* Horizontal scrollable image list */}
      <div className="flex space-x-4 overflow-x-auto w-full max-w-[600px] hide-scrollbar">
        {imageIds.slice(1).map((imageId) => (
          <div
            key={imageId}
            className={`flex-shrink-0 bg-[#F5F5F5] rounded-lg w-[80px] h-[80px] cursor-pointer border-2  ${
              currentImage === imageId ? "border-[#107C11]" : "border-[#F5F5F5]"
            }`}
          >
            <img
              src={`${apiUrl}/assets/${imageId}`}
              alt={`Product Thumbnail ${imageId}`}
              className="w-full h-full object-cover rounded-md"
              onClick={() => handleThumbnailClick(imageId)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
