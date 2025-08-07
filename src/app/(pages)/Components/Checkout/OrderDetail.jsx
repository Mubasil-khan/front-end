"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useSelector } from "react-redux";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const OrderDetail = () => {
  const router = useRouter();
  //
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState();
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState();
  const [country, setCountry] = useState("");

  const [qty, setQty] = useState();

  const [border, setBorder] = useState();

  const [next, setNext] = useState("item-1");
  const handalNext = (item) => {
    setNext(item);
  };

  const OrderUrl =
    "https://strapi-backend-1-7qd7.onrender.com/api/orders?populate=*";

  const deleteDataInCart =
    "https://strapi-backend-1-7qd7.onrender.com/api/user-carts";

  const deleteData = async (id) => {
    try {
      const res = await axios.delete(`${deleteDataInCart}/${id}`);
    } catch (error) {
      console.error(error);
    }
  };

  const handalOrder = async () => {
    try {
      const OrderDetails = [];

      userCart.forEach((UserCartDetail) => {
        UserCartDetail.products.forEach((productData) => {
          const Qty = counts[productData.id] || 1;
          const Price = productData.price;
          const TotalPrice = Qty * Price;
          const product_name = productData.documentId;
          OrderDetails.push({
            product_name,
            Qty,
            Price,
            TotalPrice,
          });
        });
      });

      const res = await axios.post(OrderUrl, {
        data: {
          FullName: fullName,
          Email: email,
          Phone: phone,
          Address: address,
          city: city,
          state: state,
          zip: zip,
          country: country,
          OverAllTotal: Finaltotal,
          OrderDetails: OrderDetails,
        },
      });

      toast.success(
        "Your order has been placed successfully. Thank you for shopping with us!",
        {
          position: "top-right",
          autoClose: 2000,
          theme: "colored",
        }
      );
      setInterval(() => {
        router.push("/");
      }, 100);
    } catch (error) {
      console.error("Error creating order:", error.response?.data);
    }
  };

  const isFormValid =
    !!fullName.trim() &&
    !!email.trim() &&
    !!phone &&
    !!address.trim() &&
    !!city.trim() &&
    !!state.trim() &&
    !!zip &&
    !!country.trim();

  //
  const [userCart, setUserCart] = useState([]);

  const UCart =
    "https://strapi-backend-1-7qd7.onrender.com/api/user-carts?populate[products][populate]=image&populate=users_permissions_user";

  const GetCartData = async () => {
    try {
      const token = localStorage.getItem("Token");
      const userId = localStorage.getItem("userId");

      const res = await axios.get(UCart);

      // Filter only cart items for this user
      const userCartItems = res.data.data.filter(
        (item) => item.users_permissions_user?.id == userId
      );

      setUserCart(userCartItems);
      console.log("Filtered User Cart Items:", userCartItems);
    } catch (error) {
      console.error("Cart fetch error:", error);
    }
  };

  useEffect(() => {
    GetCartData();
  }, []);

  const counts = useSelector((state) => state.counter.value);

  let OverAllTotal = 0;
  let discount = 0;
  let charge = 50.0;
  let Finaltotal = 0;

  return (
    <>
      <ToastContainer />
      <div className="lg:grid xl:grid-cols-3 lg:grid-cols-2 gap-10 flex flex-col">
        <div className="xl:col-span-2 AddressSection">
          <Accordion
            type="single"
            collapsible
            className="w-full"
            defaultValue="item-1"
            value={next}
            onValueChange={setNext}
          >
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-xl font-semibold text-green-800 mb-4 bg-green-100 p-5 items-center ">
                Shipping & Address Information
              </AccordionTrigger>
              <AccordionContent>
                <form
                  action=""
                  method="post"
                  className="flex flex-col gap-5 text-balance p-4"
                >
                  <div className="block ">
                    <label
                      htmlFor="FullName"
                      className="mb-1 text-lg font-semibold block"
                    >
                      Enter FullName
                    </label>
                    <input
                      type="text"
                      id="FullName"
                      className={`w-full border p-1.5 outline-none rounded-md ${
                        border && !fullName.trim() ? "bg-red-100 border-2" : ""
                      }`}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="Email"
                      className="mb-1 text-lg font-semibold block"
                    >
                      Enter Email
                    </label>
                    <input
                      type="email"
                      name=""
                      id="Email"
                      className={`w-full border p-1.5 outline-none rounded-md ${
                        border && !email.trim() ? "bg-red-100 border-2" : ""
                      }`}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="Phone"
                      className="mb-1 text-lg font-semibold block"
                    >
                      Enter Phone
                    </label>
                    <input
                      type="number"
                      name=""
                      id="Phone"
                      className={`w-full border p-1.5 outline-none rounded-md ${
                        border && !phone ? "bg-red-100 border-2" : ""
                      }`}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      minLength={10}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="Address"
                      className="mb-1 text-lg font-semibold block "
                    >
                      Enter Address
                    </label>
                    <textarea
                      name=""
                      id="Address"
                      className={`w-full border p-1.5 outline-none rounded-md ${
                        border && !address.trim() ? "bg-red-100 border-2" : ""
                      }`}
                      onChange={(e) => setAddress(e.target.value)}
                      required
                      minLength={20}
                    ></textarea>
                  </div>
                  <div className="flex flex-col gap-5 sm:grid grid-cols-2  sm:gap-8">
                    <div>
                      <label
                        htmlFor="city"
                        className="mb-1 text-lg font-semibold block"
                      >
                        Enter city
                      </label>
                      <input
                        type="text"
                        name=""
                        id="city"
                        className={`w-full border p-1.5 outline-none rounded-md ${
                          border && !city.trim() ? "bg-red-100 border-2" : ""
                        }`}
                        onChange={(e) => setCity(e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="state"
                        className="mb-1 text-lg font-semibold block"
                      >
                        Enter state
                      </label>
                      <input
                        type="text"
                        name=""
                        id="state"
                        className={`w-full border p-1.5 outline-none rounded-md ${
                          border && !state.trim() ? "bg-red-100 border-2" : ""
                        }`}
                        onChange={(e) => setState(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-5 sm:grid grid-cols-2  sm:gap-8">
                    <div>
                      <label
                        htmlFor="zip"
                        className="mb-1 text-lg font-semibold block"
                      >
                        zip
                      </label>
                      <input
                        type="number"
                        name=""
                        id="zip"
                        className={`w-full border p-1.5 outline-none rounded-md ${
                          border && !zip ? "bg-red-100 border-2" : ""
                        }`}
                        onChange={(e) => setZip(e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="country"
                        className="mb-1 text-lg font-semibold block"
                      >
                        Enter country
                      </label>
                      <input
                        type="text"
                        name=""
                        id="country"
                        className={`w-full border p-1.5 outline-none rounded-md ${
                          border && !country.trim() ? "bg-red-100 border-2" : ""
                        }`}
                        onChange={(e) => setCountry(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <button
                    className="bg-green-100 p-2 w-full rounded-md text-lg font-semibold text-green-800 cursor-pointer"
                    onClick={(e) => {
                      e.preventDefault(); // Prevent form submit
                      setBorder(true);
                      if (isFormValid) {
                        handalNext("item-2"); // Go to next accordion item
                      }
                    }}
                  >
                    Next
                  </button>
                </form>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger className="text-xl font-semibold text-green-800 mb-4 bg-green-100 p-5 items-center">
                Select Payment Method
              </AccordionTrigger>
              <AccordionContent className="flex flex-col gap-4 text-balance p-4">
                <div className="flex flex-col gap-4">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="credit_card"
                      className="w-5 h-5 text-green-600"
                    />
                    <span className="text-lg">Credit / Debit Card</span>
                  </label>

                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="upi"
                      className="w-5 h-5 text-green-600"
                    />
                    <span className="text-lg">UPI / QR Code</span>
                  </label>

                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      className="w-5 h-5 text-green-600"
                    />
                    <span className="text-lg">Cash on Delivery (COD)</span>
                  </label>

                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="net_banking"
                      className="w-5 h-5 text-green-600"
                    />
                    <span className="text-lg">Net Banking</span>
                  </label>
                  <button
                    className="bg-green-100 p-2 rounded-md text-lg font-semibold text-green-800 cursor-pointer"
                    onClick={() => handalNext("item-3")}
                  >
                    Next
                  </button>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger className="text-xl font-semibold text-green-800 mb-4 bg-green-100 p-5 items-center">
                Return Policy
              </AccordionTrigger>
              <AccordionContent className="flex flex-col gap-4 text-balance">
                <p>
                  We stand behind our products with a comprehensive 30-day
                  return policy. If you&apos;re not completely satisfied, simply
                  return the item in its original condition.
                </p>
                <p>
                  Our hassle-free return process includes free return shipping
                  and full refunds processed within 48 hours of receiving the
                  returned item.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        <div className="flex flex-col gap-5">
          <div className="h-fit max-h-80 overflow-auto bg-green-100 p-4 rounded-lg flex flex-col gap-6 ">
            <h2 className="text-2xl text-green-800 font-semibold">Your Cart</h2>
            {userCart.map((Cartitem) =>
              Cartitem.products.map((products) => {
                const Qty = counts[products.id] || 1;
                const total = Qty * products.price;

                OverAllTotal += total;
                discount = Math.round((OverAllTotal * 10) / 100);
                Finaltotal = OverAllTotal + charge - discount;

                return (
                  <div className="grid grid-cols-4" key={Cartitem.id}>
                    <Image
                      src={products.image[0].url}
                      alt="products.image"
                      height={60}
                      width={60}
                      unoptimized
                      className="rounded-lg"
                    />
                    <div className="flex flex-col col-span-2">
                      <h4 className="text-green-800 text-lg">
                        {products.name.length < 18
                          ? products.name
                          : products.name.slice(0, 18) + "..."}
                      </h4>
                      <h6 className="text-green-800 text-md">Qty :{Qty}</h6>
                    </div>
                    <h4 className="text-green-800 text-lg text-end">{total}</h4>
                  </div>
                );
              })
            )}
          </div>
          <div className="bg-green-100 rounded-lg p-4 shadow-md w-full max-w-md">
            <h2 className="text-2xl font-semibold mb-4 text-green-900">
              Order Summary
            </h2>

            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-700">Subtotal</span>
              <span className="font-medium text-gray-800">{OverAllTotal}</span>
            </div>

            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-700">Shipping</span>
              <span className="font-medium text-gray-800">{charge}</span>
            </div>

            <div className="flex justify-between items-center mb-2 text-red-600">
              <span>Discount 10%</span>
              <span>{discount}</span>
            </div>

            <div className="border-t border-green-700 my-3" />

            <div className="flex justify-between items-center text-xl font-bold text-green-900">
              <span>Total</span>
              <span>{Finaltotal}</span>
            </div>

            {userCart.map((Cartitem) => (
              <button
                className="mt-4 w-full bg-green-800 text-white py-2 rounded hover:bg-green-900 transition cursor-pointer"
                onClick={(e) => {
                  e.preventDefault(); // Prevent form submit
                  setBorder(true);
                  if (isFormValid) {
                    handalOrder();
                    if (handalOrder) {
                      deleteData(Cartitem.documentId);
                    }

                    handalNext("item-1"); // Go to next accordion item
                  } else {
                    toast.error("Enter all details correctly", {
                      position: "top-right",
                      autoClose: 2000,
                      theme: "colored",
                    });
                  }
                }}
              >
                Proceed to Checkout
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderDetail;
