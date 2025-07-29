"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Boxes, Heart, Rocket, ShoppingCart } from "lucide-react";
import { Star, StarHalf } from "lucide-react";

import "swiper/css";
import InnerImageZoom from "react-inner-image-zoom";
// import "react-inner-image-zoom/styles.css";
import "react-inner-image-zoom/lib/styles.min.css";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";

const Products = () => {
  const [data, setData] = useState([]);
  const ProductUrl = "http://localhost:1337/api/products?populate=*";

  useEffect(() => {
    prdoductDisplay();
  }, []);

  const prdoductDisplay = async () => {
    try {
      const res = await axios.get(ProductUrl);
      setData(res.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto p-4 my-4 block">
      <h2 className="font-bold text-3xl text-green-800 my-5 ">
        Farm-Fresh Goodness: Fruits & Vegetables
      </h2>
      <Swiper
        spaceBetween={40}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1280: { slidesPerView: 4 },
        }}
      >
        {data.map((item) => {
          const imageUrl = item.image?.[0]?.url
            ? `http://localhost:1337${item.image[0].url}`
            : "/placeholder.png";

          return (
            <SwiperSlide key={item.id}>
              <div className=" border rounded-2xl border-gray-300 p-4 flex flex-col gap-2 cursor-pointer group shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-center relative">
                  <Image
                    src={imageUrl}
                    alt={item.name}
                    height={180}
                    width={180}
                    unoptimized
                    className="group-hover:scale-105 duration-300 object-contain"
                  />
                  <p className="absolute top-2 -left-4 bg-green-100 px-6 text-sm text-green-800 rounded-r-full">
                    {Math.round(((item.mrp - item.price) / item.mrp) * 100)}%
                    off
                  </p>
                </div>

                <h2 className="text-lg font-semibold">
                  {item.name.length > 20
                    ? item.name.slice(0, 20) + "..."
                    : item.name}
                </h2>

                <p className="text-gray-600 text-sm">
                  {item.description.slice(0, 60)}...
                </p>

                <div className="flex items-center gap-2 text-md font-medium">
                  <h6 className="text-green-700">₹{item.price}</h6>
                  <p className="text-gray-400 line-through">₹{item.mrp}</p>
                </div>

                <Dialog className="ProductSwiper">
                  <DialogTrigger asChild>
                    <button className="bg-green-600 hover:bg-green-700 w-full flex items-center gap-2 text-white py-2 rounded-full justify-center text-sm font-semibold shadow">
                      <ShoppingCart size={18} /> Add To Cart
                    </button>
                  </DialogTrigger>

                  <DialogContent className="max-w-[800px] max-h-[100vh] overflow-y-auto">
                    <DialogDescription>
                      <div className="flex flex-col md:flex-row gap-6 p-4 rounded-2xl border relative">
                        <div className="w-full md:w-1/2 flex justify-center">
                          <InnerImageZoom
                            src={imageUrl}
                            zoomSrc={imageUrl}
                            zoomType="hover"
                            zoomPreload={true}
                            alt={item.name}
                            className="rounded-lg"
                          />
                          <p className="absolute top-5 left-0 bg-green-100 px-6 text-sm text-green-800 rounded-r-full">
                            {Math.round(
                              ((item.mrp - item.price) / item.mrp) * 100
                            )}
                            % off
                          </p>
                        </div>

                        <div className="flex flex-col gap-3 w-full md:w-1/2">
                          <h2 className="text-xl font-semibold">
                            {item.name.length > 20
                              ? item.name.slice(0, 20) + "..."
                              : item.name}
                          </h2>
                          <p className="text-gray-600 text-sm">
                            {item.description.slice(0, 200)}...
                          </p>

                          <div className="flex items-center gap-2 text-lg font-semibold text-green-700">
                            ₹{item.price}
                            <p className="text-gray-400 line-through text-sm font-normal">
                              ₹{item.mrp}
                            </p>
                          </div>

                          <p className="text-xs bg-green-100 text-green-700 font-medium px-2 py-1 rounded-full w-fit">
                            Inclusive of all taxes
                          </p>

                          <div className="flex items-center gap-1">
                            <Star className="w-5 h-5 text-yellow-500" />
                            <Star className="w-5 h-5 text-yellow-500" />
                            <Star className="w-5 h-5 text-yellow-500" />
                            <Star className="w-5 h-5 text-yellow-500" />
                            <StarHalf className="w-5 h-5 text-yellow-500" />
                          </div>

                          <div className="flex gap-4 ">
                            <button className="bg-green-600 hover:bg-green-700 flex items-center gap-2 text-white py-2 px-6 rounded-full text-sm font-medium shadow">
                              <ShoppingCart size={18} /> Add To Cart
                            </button>

                            <button className="border border-green-600 text-green-700 flex items-center gap-2 hover:bg-green-50 py-2 px-4 rounded-full text-sm font-medium">
                              <Heart size={16} /> Wishlist
                            </button>
                          </div>

                          <div className="mt-2 flex flex-col gap-2 text-sm text-green-800">
                            <div className="flex items-center gap-1">
                              <Boxes size={16} />
                              Category: {item.categories?.[0]?.name}
                            </div>
                            <div className="flex items-center gap-1">
                              <Rocket size={16} />
                              Delivered in 30 mins
                            </div>
                          </div>
                        </div>
                      </div>
                    </DialogDescription>
                  </DialogContent>
                </Dialog>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default Products;

<button
  type="button"
  data-slot="dialog-close"
  class="ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&amp;_svg]:pointer-events-none [&amp;_svg]:shrink-0 [&amp;_svg:not([class*='size-'])]:size-4"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    class="lucide lucide-x"
    aria-hidden="true"
  >
    <path d="M18 6 6 18"></path>
    <path d="m6 6 12 12"></path>
  </svg>
  <span class="sr-only">Close</span>
</button>;
