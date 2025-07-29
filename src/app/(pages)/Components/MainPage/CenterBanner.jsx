import React from "react";
import Image from "next/image";

const CenterBanner = () => {
  return (
    <div className="container mx-auto flex flex-wrap md:flex-nowrap gap-6 p-4">
      <div className="relative w-full h-60 rounded-2xl overflow-hidden">
        <Image
          src="/Image/Center-grocery-banner.png"
          alt="Center-grocery"
          fill
          className="object-cover"
        />
        <div className="absolute top-[25%] left-[4%]  flex-col gap-1">
          <h4 className="text-2xl font-semibold text-gray-600">
            Fruits & Vegetables
          </h4>
          <p className="text-lg  text-gray-600">Get Upto 30% Off</p>
          <button className=" rounded-3xl mt-2 py-1.5 bg-gray-600 cursor-pointer w-full">
            Shop Now
          </button>
        </div>
      </div>
      <div className="relative w-full h-60 rounded-2xl overflow-hidden">
        <Image
          src="/Image/grocery-banner-2.jpg"
          alt="Center-grocery"
          fill
          className="object-cover"
        />
        <div className="absolute top-[25%] left-[4%]  flex-col gap-1">
          <h4 className="text-2xl font-semibold text-gray-600">
            Fruits & Vegetables
          </h4>
          <p className="text-lg  text-gray-600">Get Upto 30% Off</p>
          <button className=" rounded-3xl mt-2 py-1.5 bg-gray-600 cursor-pointer w-full">
            Shop Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default CenterBanner;
