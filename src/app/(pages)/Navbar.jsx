"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AlignJustify, Search } from "lucide-react";

const Navbar = () => {
  const [hide, setHide] = useState(false);

  const manageMenu = () => {
    setHide((a) => !a);
  };
  return (
    <div className="bg-green-100 py-2">
      <div className="container mx-auto flex items-center justify-between px-4 md:px-0">
        <div className="Logo">
          <Image
            src="/Images/logo.png"
            alt=""
            height={130}
            width={130}
            className="object-contain"
          />
        </div>
        <div className="hidden md:flex gap-5 items-center">
          <Link href="" className="text-green-800 text-lg ">
            Home
          </Link>
          <Link href="" className="text-green-800 text-lg ">
            Categories
          </Link>
          <Link href="" className="text-green-800 text-lg ">
            Cart
          </Link>
          <Link href="" className="text-green-800 text-lg ">
            Contact
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <Search className="h-6 w-6 cursor-pointer" />
          <AlignJustify
            className="h-6 w-6 md:hidden cursor-pointer"
            onClick={manageMenu}
          />
          <Link
            href=""
            className="text-white bg-green-700 py-1 px-4 rounded-md"
          >
            Login
          </Link>
        </div>
      </div>
      {hide && (
        <div className="md:hidden flex flex-col gap-3 px-10 my-8">
          <Link href="" className="text-green-800 text-lg ">
            Home
          </Link>
          <Link href="" className="text-green-800 text-lg ">
            Categories
          </Link>
          <Link href="" className="text-green-800 text-lg ">
            Cart
          </Link>
          <Link href="" className="text-green-800 text-lg ">
            Contact
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
