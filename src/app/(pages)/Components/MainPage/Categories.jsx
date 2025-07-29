"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

const Categories = () => {
  useEffect(() => {
    display();
  }, []);
  const Categoriesurl = "http://localhost:1337/api/categories?populate=*";
  const [data, setData] = useState([]);

  const display = async () => {
    try {
      const res = await axios.get(Categoriesurl);
      setData(res.data.data);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="container mx-auto p-4 my-4 block">
      <h2 className="font-bold text-3xl text-green-800 my-5 ">
        Shop by Categories
      </h2>
      <Swiper
        spaceBetween={20}
        breakpoints={{
          320: {
            slidesPerView: 2,
          },
          480: {
            slidesPerView: 3,
          },
          640: {
            slidesPerView: 4,
          },
          768: {
            slidesPerView: 5,
          },
          1024: {
            slidesPerView: 6,
          },
          1280: {
            slidesPerView: 7,
          },
        }}
      >
        {data.map((item) => (
          <div key={item.id}>
            <SwiperSlide>
              <div className="flex flex-col justify-center items-center gap-2 bg-green-100 group py-4  rounded-3xl ">
                <div className=" duration-300 group-hover:scale-110">
                  <Image
                    src={`http://localhost:1337${item?.icon?.[0]?.url}`}
                    alt="CategoriesImage"
                    height={80}
                    width={80}
                    unoptimized
                  />
                </div>
                <h4 className="text-lg font-semibold text-green-800  text-center">
                  {item.name}
                </h4>
              </div>
            </SwiperSlide>
          </div>
        ))}
      </Swiper>
    </div>
  );
};

export default Categories;
