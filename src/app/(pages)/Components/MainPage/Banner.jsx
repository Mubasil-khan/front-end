"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const Banner = () => {
  const [data, setData] = useState([]);

  const bannerUrl =
    "https://strapi-backend-1-7qd7.onrender.com/api/banners?populate=*";

  const Banners = async () => {
    try {
      const response = await axios.get(bannerUrl);
      setData(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    Banners();
  }, []);
  return (
    <div className="container mx-auto p-4 my-4 block">
      <Swiper spaceBetween={50} slidesPerView={1}>
        {data.map((item) => {
          return (
            <SwiperSlide key={item.id}>
              <div className="relative h-[200px] md:h-[300px] w-full overflow-hidden rounded-3xl shadow-md">
                <Image
                  src={`https://strapi-backend-1-7qd7.onrender.com${item.BannerImg?.[0].url}`}
                  alt="Banner"
                  fill
                  unoptimized
                  className="object-cover"
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
