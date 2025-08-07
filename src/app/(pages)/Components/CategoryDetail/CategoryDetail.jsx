"use client";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Boxes, Heart, Rocket, ShoppingCart } from "lucide-react";
import { Star, StarHalf } from "lucide-react";

import "swiper/css";
import InnerImageZoom from "react-inner-image-zoom";
import "react-inner-image-zoom/lib/styles.min.css";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DialogTitle } from "@radix-ui/react-dialog";
import AOS from "aos";
import "aos/dist/aos.css";
import { useParams } from "next/navigation";
import Products from "../MainPage/Products";

const CategoryDetail = () => {
  const params = useParams();
  const [item, setItem] = useState([]);

  const productUrl =
    "https://strapi-backend-1-7qd7.onrender.com/api/products?populate=*";

  const getData = async () => {
    try {
      const res = await axios.get(productUrl);
      setItem(res.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="container mx-auto  p-4 block">
      <h2 className="text-green-800 font-semibold text-2xl my-6">
        Explore {decodeURIComponent(params.categoryName.trim())} Products
      </h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3  gap-8 ">
        {item.map((item) =>
          params.categoryName === item.categories?.[0]?.name ? (
            <div className="  border rounded-2xl border-gray-300 p-4 flex flex-col gap-2 cursor-pointer group shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-center relative">
                <Image
                  src={item.image[0].url}
                  alt={item.name}
                  height={180}
                  width={180}
                  unoptimized
                  className="group-hover:scale-105 duration-300 object-contain"
                />
                <p className="absolute top-2 -left-4 bg-green-100 px-6 text-sm text-green-800 rounded-r-full">
                  {Math.round(((item.mrp - item.price) / item.mrp) * 100)}% off
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
                  <button className="bg-green-800 hover:bg-green-700 w-full flex items-center gap-2 text-white py-2 rounded-full justify-center text-sm font-semibold shadow">
                    <ShoppingCart size={18} /> Add To Cart
                  </button>
                </DialogTrigger>

                <DialogContent className="max-w-[800px] max-h-[100vh] overflow-y-auto">
                  <DialogTitle></DialogTitle>
                  <DialogDescription>
                    <div className="flex flex-col md:flex-row gap-6 p-4 rounded-2xl border relative">
                      <div className="w-full md:w-1/2 flex justify-center">
                        <InnerImageZoom
                          src={item.image[0].url}
                          zoomSrc={item.image[0].url}
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
                          <p className="text-xs bg-green-100 text-green-700 font-medium px-2 py-0.5 rounded-full w-fit">
                            Inclusive of all taxes
                          </p>
                        </div>

                        <div className="flex items-center gap-1">
                          <Star className="w-5 h-5 text-yellow-500" />
                          <Star className="w-5 h-5 text-yellow-500" />
                          <Star className="w-5 h-5 text-yellow-500" />
                          <Star className="w-5 h-5 text-yellow-500" />
                          <StarHalf className="w-5 h-5 text-yellow-500" />
                        </div>
                        <DialogClose asChild>
                          <div className="flex gap-4 ">
                            <button
                              className="bg-green-600 hover:bg-green-700 flex items-center gap-2 text-white py-2 px-6 rounded-full text-sm font-medium shadow"
                              onClick={() => {
                                handalCart(item);
                              }}
                            >
                              <ShoppingCart size={18} /> Add To Cart
                            </button>

                            <button className="border border-green-600 text-green-700 flex items-center gap-2 hover:bg-green-50 py-2 px-4 rounded-full text-sm font-medium">
                              <Heart size={16} /> Wishlist
                            </button>
                          </div>
                        </DialogClose>

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
          ) : null
        )}
      </div>
      <Products />
    </div>
  );
};

export default CategoryDetail;
