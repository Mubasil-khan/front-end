import { Clock, Store, Truck, Lock } from "lucide-react";
import React from "react";

const Fetures = () => {
  return (
    <div className=" p-4 container mx-auto ">
      <div className="grid bg-green-100 rounded-4xl grid-cols-1 sm:grid-cols-2 gap-8 lg:grid-cols-4 justify-between  px-6 py-6 lg:py-2">
        <div className="flex flex-col gap-1 items-center justify-center ">
          <Truck className="h-15 w-15 text-green-800" />
          <h4 className="text-2xl text-green-800 font-semibold">
            Free Shipping{" "}
          </h4>
          <p className="text-sm text-green-800 font-semibold">
            On orders over $100
          </p>
        </div>
        <div className="flex flex-col gap-1 items-center justify-center ">
          <Clock className="h-15 w-15 text-green-800" />
          <h4 className="text-2xl text-green-800 font-semibold">
            Express Delivery
          </h4>
          <p className="text-sm text-green-800 font-semibold">
            Available for Metro Areas*
          </p>
        </div>
        <div className="flex flex-col gap-1 items-center justify-center ">
          <Store className="h-15 w-15 text-green-800" />
          <h4 className="text-2xl text-green-800 font-semibold">
            Pickup from Store
          </h4>
          <p className="text-sm text-green-800 font-semibold">
            For Your Comfort
          </p>
        </div>
        <div className="flex flex-col gap-1 items-center justify-center ">
          <Lock className="h-15 w-15 text-green-800" />
          <h4 className="text-2xl text-green-800 font-semibold">
            Secured Shopping
          </h4>
          <p className="text-sm text-green-800 font-semibold">
            Your Safety is Our Priority
          </p>
        </div>
      </div>
    </div>
  );
};

export default Fetures;
