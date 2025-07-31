"use client";
import React, { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import axios from "axios";

const Address = () => {
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

  const OrderUrl = "http://localhost:1337/api/orders?populate=*";

  const handalOrder = async () => {
    try {
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
        },
      });
    } catch (error) {
      console.error("Error is .......", error.response?.data);
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

  return (
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
              <div className="sm:grid grid-cols-2  gap-8">
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
              <div className="sm:grid grid-cols-2  gap-8">
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
                    handalOrder();
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
              We stand behind our products with a comprehensive 30-day return
              policy. If you&apos;re not completely satisfied, simply return the
              item in its original condition.
            </p>
            <p>
              Our hassle-free return process includes free return shipping and
              full refunds processed within 48 hours of receiving the returned
              item.
            </p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default Address;
