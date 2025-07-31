"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { ShoppingCart, Trash2 } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { decrement, increment } from "@/app/features";
import Link from "next/link";

const Cart = () => {
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

  const HandalCheckOut = () => {};

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
    GetCartData();
    getData();
  }, []);
  if (cartdata.length === 0) {
    return (
      <div>
        <h1>Your Cart Is empty</h1>
      </div>
    );
  }

  return (
    <div>
      <div className="border rounded-xl ">
        <h2 className="text-4xl font-bold text-center p-10 text-green-800 bg-green-100 border-b rounded-t-xl flex justify-center gap-4">
          Shopping Cart <ShoppingCart className="h-10 w-10 text-green-800" />
        </h2>
        <div className="">
          <div className="hidden lg:grid grid grid-cols-5 justify-items-center items-center text-xl font-semibold p-8 bg-green-100 sticky   ">
            <h4 className="">Product</h4>
            <h4>Product Detail</h4>
            <h4>Quantity</h4>
            <h4>Total</h4>
            <h4>Delete</h4>
          </div>
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
                      className="lg:grid lg:grid-cols-5   justify-items-center items-center p-8 border-b  hover:bg-green-50 last:border-none"
                    >
                      <div className="">
                        <Image
                          src={`http://localhost:1337${Productitem.image[0].url}`}
                          alt="Productitem.image"
                          height={120}
                          width={120}
                          unoptimized
                          className="rounded-2xl"
                          onClick={() => dispatch(decrement())}
                        />
                      </div>
                      <div className="flex flex-col gap-2 ">
                        <h4 className="text-xl font-semibold">
                          {Productitem.name}
                        </h4>
                        <p>{Productitem.categories[0]?.name}</p>
                        <h6 className="text-blue-900 text-xl font-bold">
                          ₹{Productitem.price}
                        </h6>
                      </div>
                      <div className="flex items-center gap-6 ">
                        <Image
                          src="/Image/remove_icon_red.png"
                          alt="add_icon"
                          height={32}
                          width={32}
                          onClick={() => dispatch(decrement(Productitem.id))}
                        />
                        <h6 className="text-lg font-semibol text-green-800">
                          {count}
                        </h6>
                        <Image
                          src="/Image/add_icon_green.png"
                          alt="add_icon"
                          height={32}
                          width={32}
                          onClick={() => dispatch(increment(Productitem.id))}
                        />
                      </div>

                      <h6 className="text-blue-900 text-xl font-bold">
                        ₹{total}
                      </h6>
                      <Trash2
                        className="h-6 w-6 text-red-600 cursor-pointer"
                        onClick={() => deleteData(Cartitem.documentId)}
                      />
                    </div>
                  </div>
                );
              }
            })
          )}
        </div>
      </div>
      <div>
        <h2>Total Amount :{OverAllTotal}</h2>
      </div>
      <Link href="\checkout">CheckOut </Link>
    </div>
  );
};

export default Cart;
