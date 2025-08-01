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
  const [cartdata, setCartdata] = useState([]);

  const UserCartUrl = "http://localhost:1337/api/user-carts?populate=*";

  const GetCartData = async () => {
    try {
      const res = await axios.get(UserCartUrl);
      setCartdata(res.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteData = async (id) => {
    try {
      const res = await axios.delete(
        `http://localhost:1337/api/user-carts/${id}`
      );

      GetCartData();
    } catch (error) {
      console.error(error);
    }
  };

  const handalLogout = () => {
    localStorage.removeItem("Token");
    setLogin(false);
  };

  // Product
  const ProductUrl = "http://localhost:1337/api/products?populate=*";
  const getData = async () => {
    try {
      const res = await axios.get(ProductUrl);
      setProductdata(res.data.data);
      console.log("My data For Image", res.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const checkLogin = localStorage.getItem("Token");
    setLogin(!!checkLogin);
    GetCartData();
    getData();
  }, []);
  // if (cartdata.length === 0) {
  //   return (
  //     <div>
  //       <h1>Your Cart Is empty</h1>
  //     </div>
  //   );
  // }
  //.........................
  return (
    <div className="bg-green-100 py-2 sticky top-0 z-10">
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
          <Link href="" className="text-green-800 text-lg ">
            Categories
          </Link>
          <Link href="/cart" className="text-green-800 text-lg ">
            Cart
          </Link>
          <Link href="" className="text-green-800 text-lg ">
            Contact
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <Sheet>
            <SheetTrigger asChild>
              <ShoppingCart className="h-6 w-6 cursor-pointer" />
            </SheetTrigger>
            <SheetContent className="h-screen overflow-y-auto flex flex-col justify-between">
              <div>
                <div className="h-screen flex-grow">
                  <h2 className="text-xl font-bold text-center p-5 items-center text-green-800 bg-green-100 border-b  flex justify-center gap-4">
                    Shopping Cart{" "}
                    <ShoppingCart className="h-6 w-6 text-green-800" />
                  </h2>
                  <div className="">
                    {cartdata.map((Cartitem) =>
                      productdata.map((Productitem) => {
                        if (Cartitem.ProductId === Productitem.documentId) {
                          const count = counts[Productitem.id] || 1;
                          const total = count * Productitem.price;
                          OverAllTotal += total;
                          return (
                            <div>
                              <div
                                key={Productitem.id}
                                className=" items-center p-8 border-b  hover:bg-green-50 last:border-none"
                              >
                                <div className="flex gap-6 ">
                                  <Image
                                    src={`http://localhost:1337${Productitem.image[0].url}`}
                                    alt="Productitem.image"
                                    height={80}
                                    width={80}
                                    unoptimized
                                    className="rounded-2xl "
                                    onClick={() => dispatch(decrement())}
                                  />
                                  <div className="flex flex-col gap-4">
                                    <div className="flex gap-6">
                                      <h4 className="text-lg font-semibold w-40">
                                        {Productitem.name.slice(0, 18)}
                                      </h4>
                                      <h6 className="text-blue-900 text-xl font-bold">
                                        ₹{Productitem.price}
                                      </h6>
                                    </div>

                                    <div className="flex justify-between items-center">
                                      <div className="flex items-center gap-4 ">
                                        <Image
                                          src="/Image/remove_icon_red.png"
                                          alt="add_icon"
                                          height={26}
                                          width={26}
                                          onClick={() =>
                                            dispatch(decrement(Productitem.id))
                                          }
                                        />
                                        <h6 className="text-lg font-semibol text-green-800">
                                          {count}
                                        </h6>
                                        <Image
                                          src="/Image/add_icon_green.png"
                                          alt="add_icon"
                                          height={26}
                                          width={26}
                                          onClick={() =>
                                            dispatch(increment(Productitem.id))
                                          }
                                        />
                                      </div>

                                      <h6 className="text-blue-900 text-xl font-bold">
                                        ₹{total}
                                      </h6>

                                      <Trash2
                                        className="h-6 w-6 text-red-600 cursor-pointer"
                                        onClick={() =>
                                          deleteData(Cartitem.documentId)
                                        }
                                      />
                                    </div>
                                  </div>
                                </div>

                                {/* <div className="flex flex-col gap-2 ">
                                  <p>{Productitem.categories[0]?.name}</p>
                                </div> */}
                              </div>
                            </div>
                          );
                        }
                      })
                    )}
                  </div>
                </div>

                <div className="sticky rounded-t-2xl py-4 bottom-0 bg-green-100 z-100 border-t shadow-md">
                  <div className="flex flex-col gap-5  justify-between p-4 text-lg">
                    <h2 className=" font-semibold text-green-900 flex justify-between">
                      <p>Total Amount:</p>
                      <p>₹{OverAllTotal}</p>
                    </h2>
                    <Link
                      href="/checkout"
                      className="bg-green-800 text-white text-center px-6 py-2 rounded-md hover:bg-green-700 transition"
                    >
                      Checkout
                    </Link>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>

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
