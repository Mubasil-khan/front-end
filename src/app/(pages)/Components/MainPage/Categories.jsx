"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import AOS from "aos";
import "aos/dist/aos.css";
import Link from "next/link";

import "swiper/css";

const Categories = () => {
  useEffect(() => {
    display();
  }, []);
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
    });
  }, []);

  const Categoriesurl =
    "https://strapi-backend-1-7qd7.onrender.com/api/categories?populate=*";

  const [data, setData] = useState([]);

  const display = async () => {
    try {
      const res = await axios.get(Categoriesurl);
      setData(res.data.data);
      console.log("Images Is.................", res.data.data);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div
      className="container mx-auto p-4 lg:my-4 block "
      id="categories"
      data-aos="fade-up"
    >
      <h2 className="font-bold text-2xl md:text-3xl text-green-800 mb-5 mt-2">
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
              <Link
                href={`/category/${item.name}`}
                className="flex flex-col justify-center items-center gap-2 bg-green-100 group py-4  rounded-3xl "
              >
                <div className=" duration-300 group-hover:scale-110">
                  <Image
                    src={item?.icon[0]?.url}
                    alt="CategoriesImage"
                    height={80}
                    width={80}
                    unoptimized
                  />
                </div>
                <h4 className="text-lg font-semibold text-green-800  text-center">
                  {item.name}
                </h4>
              </Link>
            </SwiperSlide>
          </div>
        ))}
      </Swiper>
    </div>
  );
};

export default Categories;
