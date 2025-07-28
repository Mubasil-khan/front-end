"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const Banner = () => {
  const [data, setData] = useState([]);

  const bannerUrl = "http://localhost:1337/api/banners?populate=*";

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
    <div className="my-8 container mx-auto px-4 ">
      <Swiper spaceBetween={50} slidesPerView={1}>
        {data.map((item) => {
          return (
            <SwiperSlide key={item.id}>
              <div className="relative h-[200px] md:h-[300px] w-full overflow-hidden rounded-3xl shadow-md">
                <Image
                  src={`http://localhost:1337${item.BannerImg?.[0].url}`}
                  alt="Banner"
                  fill
                  unoptimized
                  className="object:fill"
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
