import React from "react";
import HeadingDescription from "../Heading-Description/Heading-Description";

interface Specification {
  spec_type: string;
  spec_value: string;
}

interface ProductSpecificationsProps {
  heading: string;
  desc: string;
  specData: Specification[]; // List of specifications
}

export default function ProductSpecifications({
  heading,
  desc,
  specData = [], // Default to an empty array
}: ProductSpecificationsProps) {
  return (
    <div className="py-10 my-10">
      {/* Heading Section */}
      <HeadingDescription
        subtitle="Specifications"
        heading={heading}
        desc={desc}
        className="text-center mb-10"
      />

      {/* Specification Grid */}
      <div className="rounded-lg p-6 w-full">
        <h2 className="text-lg uppercase font-semibold text-gray-800 border-t pt-2 mb-5">
          Technical Specifications
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-5 text-sm text-gray-600">
          {specData.length > 0 ? (
            specData.map((spec, index) => (
              <div className="flex w-full border-b pb-5" key={index}>
                {/* Specification Label */}
                <div className="font-semibold w-2/5 uppercase text-gray-800">
                  <p>{spec.spec_type}</p>
                </div>
                {/* Specification Value */}
                <div className="w-3/5 text-gray-600">
                  <p>{spec.spec_value}</p>
                </div>
              </div>
            ))
          ) : (
            <p>No specifications available.</p>
          )}
        </div>
      </div>
    </div>
  );
}
