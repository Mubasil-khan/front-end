"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Image from "next/image";

const OrderDetail = () => {
  const [product, setPeoduct] = useState([]);
  const [userCart, setUserCart] = useState([]);

  const UCart = "http://localhost:1337/api/user-carts?populate=*";
  const ProductUrl = "http://localhost:1337/api/products?populate=*";

  const getProduct = async () => {
    try {
      const res = await axios.get(ProductUrl);
      setPeoduct(res.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getUserCart = async () => {
    try {
      const res = await axios.get(UCart);
      setUserCart(res.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUserCart();
    getProduct();
  }, []);

  const [qty, setQty] = useState(22);
  const OrderUrl = "http://localhost:1337/api/orders?populate=*";

  const handalOrder = async (id) => {
    try {
      const res = await axios.put(`http://localhost:1337/api/orders${id}`, {
        data: {
          OrderDetails: [
            {
              Qty: qty,
            },
          ],
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="h-fit max-h-80 overflow-auto bg-green-100 p-4 rounded-lg flex flex-col gap-6 ">
        <h2 className="text-2xl text-green-800 font-semibold">Your Cart</h2>
        {userCart.map((Cartitem) =>
          product.map((productitem) => {
            if (Cartitem.ProductId === productitem.documentId) {
              return (
                <div className="grid grid-cols-4 ">
                  <Image
                    src={`http://localhost:1337${productitem.image[0].url}`}
                    alt="productitem.image"
                    height={60}
                    width={60}
                    unoptimized
                    className="rounded-lg"
                  />
                  <div className="flex flex-col col-span-2">
                    <h4 className="text-green-800 text-lg">
                      {productitem.name.length < 20
                        ? productitem.name
                        : productitem.name.slice(0, 20) + "..."}
                    </h4>
                    <h6 className="text-green-800 text-md">{qty}</h6>
                  </div>
                  <h4 className="text-green-800 text-lg text-end">
                    {productitem.price}
                  </h4>
                </div>
              );
            }
          })
        )}
      </div>
      <div className="bg-green-100 rounded-lg p-4 shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4 text-green-900">
          Order Summary
        </h2>

        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-700">Subtotal</span>
          <span className="font-medium text-gray-800">₹1,200.00</span>
        </div>

        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-700">Shipping</span>
          <span className="font-medium text-gray-800">₹50.00</span>
        </div>

        <div className="flex justify-between items-center mb-2 text-red-600">
          <span>Discount</span>
          <span>-₹100.00</span>
        </div>

        <div className="border-t border-green-700 my-3" />

        <div className="flex justify-between items-center text-xl font-bold text-green-900">
          <span>Total</span>
          <span>₹1,150.00</span>
        </div>

        <button
          className="mt-4 w-full bg-green-800 text-white py-2 rounded hover:bg-green-900 transition"
          onClick={() => handalOrder()}
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default OrderDetail;
