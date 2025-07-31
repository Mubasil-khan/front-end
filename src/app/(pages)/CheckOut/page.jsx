import React from "react";
import Address from "../Components/Checkout/Address";
import OrderDetail from "../Components/Checkout/OrderDetail";

const page = () => {
  return (
    <div className="container mx-auto p-4 my-10">
      <h2 className="text-center text-green-800 text-2xl mb-4 block font-semibold">
        Final Touch Before Delivery
      </h2>
      <div className="lg:grid xl:grid-cols-3 lg:grid-cols-2 gap-10 flex flex-col gap-10">
        <Address />
        <OrderDetail />
      </div>
    </div>
  );
};

export default page;
