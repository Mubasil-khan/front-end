"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Skeleton } from "@/components/ui/skeleton";
import "swiper/css";

const Banner = () => {
  const [data, setData] = useState([]);
  const [skeleton, setSkeleton] = useState(true);
  const bannerUrl =
    "https://strapi-backend-1-7qd7.onrender.com/api/banners?populate=*";

  const Banners = async () => {
    try {
      const response = await axios.get(bannerUrl);
      setData(response.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setSkeleton(false);
    }
  };

  useEffect(() => {
    setInterval(() => {
      Banners();
    }, 400);
  }, []);

  return (
    <div className="container mx-auto p-4  block">
      <Swiper spaceBetween={50} slidesPerView={1}>
        {data.map((item) => {
          return (
            <SwiperSlide key={item.id}>
              <div className="relative min-h-40 md:min-h-80 w-full h-full overflow-hidden rounded-3xl shadow-md">
                <Image
                  src={item.BannerImg[0].url}
                  alt="Banner"
                  unoptimized
                  fill
                  className="object-fill"
                />
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default Banner;
