"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

const SignIn = () => {
  const success = () => {
    toast.success("🎉 Welcome back! You've logged in successfully.", {
      position: "top-right",
      className: "toast-message",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };
  const Alert = () => {
    toast.error("⚠️ Invalid entry! Please check your details.", {
      position: "top-right",
      className: "toast-message",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  const router = useRouter();

  const [identify, setIdentify] = useState("");
  const [password, setPassword] = useState("");

  const authUrl = "http://localhost:1337/api/auth/local";

  const handalSingIn = async () => {
    try {
      const res = await axios.post(authUrl, {
        identifier: identify,
        password: password,
      });

      success();
      const jwttoken = res.data.jwt;
      localStorage.setItem("Token", jwttoken);
      router.push("/");
    } catch (error) {
      console.error(error);
      Alert();
    }
  };
  return (
    <div className="bg-green-100 px-8 py-4 rounded-2xl">
      <div className="flex flex-col items-center mb-5 gap-2">
        <Image src="/Image/logo.png" alt="Logo" height={160} width={160} />

        <p className="text-lg "> Login to continue shopping your favorites!</p>
      </div>
      <div className="flex flex-col gap-5">
        <div>
          <label
            htmlFor="email"
            className="text-lg font-semibold text-green-800 mb-2 block"
          >
            Enter Email Address
          </label>
          <input
            type="email"
            name=""
            id="email"
            required
            onChange={(e) => setIdentify(e.target.value)}
            className="w-full p-2 rounded-xl border border-green-800"
            // className={
            //   setBackground
            //     ? "bg-red-100 "
            //     : ""
            // }
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="text-lg font-semibold text-green-800 mb-2 block"
          >
            Enter password
          </label>
          <input
            type="password"
            name=""
            id="password"
            required
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 rounded-xl border border-green-800"
          />
        </div>
        <button
          className="text-lg font-semibold text-green-50 mb-2 bg-green-800 hover:bg-green-00 p-2 rounded-2xl mt-2 cursor-pointer"
          onClick={handalSingIn}
        >
          Sign In
        </button>
        <ToastContainer />
      </div>
      <div className="flex flex-col gap-2 mt-0">
        <p className="text-center text-lg">
          Don't have an account?{" "}
          <Link href="/signUp" className="text-green-800">
            Sign Up
          </Link>{" "}
        </p>

        <p className="text-center text-lg">
          {" "}
          © 2025 YourBrand. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default SignIn;
