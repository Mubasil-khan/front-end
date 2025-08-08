"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { AlignJustify, Search, ShoppingCart, Trash2, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { decrement, increment } from "@/app/features";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const [hide, setHide] = useState(false);

  const [login, setLogin] = useState(false);

  const manageMenu = () => {
    setHide((a) => !a);
  };

  //.........................

  let OverAllTotal = 0;
  const counts = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  const [productdata, setProductdata] = useState([]);

  const UserCartUrl =
    "https://strapi-backend-1-7qd7.onrender.com/api/user-carts?populate[products][populate]=image&populate=users_permissions_user";

  const GetCartData = async () => {
    try {
      const token = localStorage.getItem("Token");
      const userId = localStorage.getItem("userId");

      const res = await axios.get(UserCartUrl); // <-- now includes user relation

      // Filter only cart items for this user
      const userCartItems = res.data.data.filter(
        (item) => item.users_permissions_user?.id == userId
      );

      setProductdata(userCartItems);
      console.log("Filtered User Cart Items:", userCartItems);
    } catch (error) {
      console.error("Cart fetch error:", error);
    }
  };

  const handalLogout = () => {
    localStorage.removeItem("Token");
    setLogin(false);
  };

  useEffect(() => {
    const checkLogin = localStorage.getItem("Token");
    setLogin(!!checkLogin);
    GetCartData();
    // getData();
  }, []);

  const deleteProduct = async (id) => {
    try {
      await axios.delete(
        `https://strapi-backend-1-7qd7.onrender.com/api/user-carts/${id}`
      );
      GetCartData();
    } catch (error) {
      console.error(error);
    }
  };

  const pathname = usePathname();
  const hidecart = pathname === "/CheckOut";
  return (
    <div className="bg-green-100 py-2 sticky top-0 z-10 rounded-b-3xl">
      <div className="container mx-auto flex items-center justify-between px-4 md:px-0">
        <div className="Logo">
          <Link href="/">
            <Image
              src="/Image/logo.png"
              alt="logo"
              height={130}
              width={130}
              className="object-contain"
            />
          </Link>
        </div>
        <div className="hidden md:flex gap-5 items-center">
          <Link href="" className="text-green-800 text-lg ">
            Home
          </Link>
          <Link href="/#categories" className="text-green-800 text-lg ">
            Categories
          </Link>
          {/* <Link href="/cart" className="text-green-800 text-lg ">
            Cart
          </Link> */}
          <Link href="/#Contact" className="text-green-800 text-lg ">
            Contact
          </Link>
        </div>

        <div className="flex items-center gap-4">
          {!hidecart && login && (
            <Sheet onOpenChange={(isOpen) => isOpen && GetCartData()}>
              <SheetTrigger asChild>
                {!hidecart && (
                  <ShoppingCart className="h-6 w-6 cursor-pointer" />
                )}
              </SheetTrigger>
              <SheetContent className="h-screen p-0 flex flex-col">
                {/* Header */}
                <div className="p-4 border-b bg-green-100 text-green-800 flex justify-center items-center font-bold text-xl rounded-b-3xl">
                  Shopping Cart <ShoppingCart className="h-6 w-6 ml-2" />
                </div>

                {/* Scrollable Cart Items */}
                <div className="flex-1 overflow-y-auto">
                  {productdata.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-16 text-gray-600">
                      <ShoppingCart className="h-20 w-20 mb-4 text-gray-400" />
                      <h1 className="text-2xl font-semibold">
                        Your cart is empty
                      </h1>
                      <p className="text-sm mt-2 text-gray-500">
                        Looks like you haven't added anything yet.
                      </p>
                    </div>
                  ) : (
                    productdata.map((cartItem) => (
                      <div key={cartItem.id}>
                        {cartItem.products.map((product) => {
                          const count = counts[product.id] || 1;
                          const total = count * product.price;
                          const imageUrl = product.image?.[0]?.url;

                          // Update OverAllTotal here only if you need it later (in parent)
                          OverAllTotal += total;

                          return (
                            <div
                              key={product.id}
                              className="flex gap-4 items-center border-b hover:bg-green-50 p-4"
                            >
                              {imageUrl && (
                                <Image
                                  src={
                                    imageUrl.startsWith("http")
                                      ? imageUrl
                                      : `https://strapi-backend-1-7qd7.onrender.com${imageUrl}`
                                  }
                                  alt={product.name}
                                  height={80}
                                  width={80}
                                  unoptimized
                                  className="rounded-2xl"
                                />
                              )}

                              <div className="flex flex-col gap-2 w-full">
                                <div className="flex justify-between">
                                  <h4 className="text-md font-semibold">
                                    {product.name.length > 20
                                      ? product.name.slice(0, 20) + "..."
                                      : product.name}
                                  </h4>
                                  <h6 className="text-green-700 font-bold">
                                    ₹{product.price}
                                  </h6>
                                </div>

                                <div className="flex justify-between items-center">
                                  <div className="flex items-center gap-4">
                                    <Image
                                      src="/Image/remove_icon_red.png"
                                      alt="decrease"
                                      height={26}
                                      width={26}
                                      onClick={() =>
                                        dispatch(decrement(product.id))
                                      }
                                      className="cursor-pointer"
                                    />
                                    <span className="text-green-800 font-medium">
                                      {count}
                                    </span>
                                    <Image
                                      src="/Image/add_icon_green.png"
                                      alt="increase"
                                      height={26}
                                      width={26}
                                      onClick={() =>
                                        dispatch(increment(product.id))
                                      }
                                      className="cursor-pointer"
                                    />
                                  </div>
                                  <h6 className="text-blue-900 font-semibold">
                                    ₹{total}
                                  </h6>
                                  <Trash2
                                    className="h-6 w-6 text-red-600 cursor-pointer"
                                    onClick={() =>
                                      deleteProduct(cartItem.documentId)
                                    }
                                  />
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ))
                  )}
                </div>

                {/* Sticky Checkout Section */}
                {productdata.map((cartItem) => {
                  return cartItem.products.length > 0 ? (
                    <div className="sticky bottom-0 bg-green-100 border-t shadow-md p-4 z-10 rounded-t-3xl">
                      <div className="flex flex-col gap-4 text-lg">
                        <h2 className="font-semibold text-green-900 flex justify-between">
                          <span>Total Amount:</span>
                          <span>₹{OverAllTotal}</span>
                        </h2>
                        <Link
                          href="/CheckOut"
                          className="bg-green-800 text-white text-center px-6 py-2 rounded-md hover:bg-green-700 transition"
                        >
                          Checkout
                        </Link>
                      </div>
                    </div>
                  ) : (
                    ""
                  );
                })}
              </SheetContent>
            </Sheet>
          )}

          <Search className="h-6 w-6 cursor-pointer" />
          <AlignJustify
            className="h-6 w-6 md:hidden cursor-pointer"
            onClick={manageMenu}
          />

          {login ? (
            <div className="bg-green-800 p-1 rounded-full">
              <Select
                onValueChange={(value) => value === "logout" && handalLogout()}
              >
                <SelectTrigger>
                  <User className="text-green-500" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="logout" className="text-red-700 text-xl">
                    Logout
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          ) : (
            <Link
              href="/signUp"
              className="text-white bg-green-700 py-1 px-4 rounded-md"
            >
              Login
            </Link>
          )}
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
