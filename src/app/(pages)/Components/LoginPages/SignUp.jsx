"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

const SignUp = () => {
  const [background, setBackground] = useState(false);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
  const RegisterUrl = "http://localhost:1337/api/auth/local/register";

  const handalSignup = async () => {
    try {
      const res = await axios.post(RegisterUrl, {
        username: userName,
        email: email,
        password: password,
      });
      success();
      const jwtToken = res.data.jwt;
      localStorage.setItem("Token", jwtToken);
      router.push("/");
    } catch (error) {
      Alert();
    }
  };

  return (
    <div className="bg-green-100 px-8 py-4 rounded-2xl">
      <div className="flex flex-col items-center mb-5 gap-2">
        <Image src="/Image/logo.png" alt="Logo" height={160} width={160} />

        <p className="text-lg "> Create an account to start shopping!</p>
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
            onChange={(e) => setEmail(e.target.value)}
            className={
              setBackground
                ? "bg-red-100 w-full p-2 rounded-xl border border-green-800"
                : ""
            }
          />
        </div>
        <div>
          <label
            htmlFor="UserName"
            className="text-lg font-semibold text-green-800 mb-2 block"
          >
            Enter UserName
          </label>
          <input
            type="text"
            name=""
            id="UserName"
            required
            onChange={(e) => setUserName(e.target.value)}
            className="w-full p-2 rounded-xl border border-green-800"
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
          onClick={handalSignup}
        >
          Sign Up
        </button>
        <ToastContainer />
      </div>
      <div className="flex flex-col gap-2 mt-4">
        <p className="text-center text-lg">
          Already have an account?{" "}
          <Link href="/signIn" className="text-green-800">
            Sign In
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

export default SignUp;
