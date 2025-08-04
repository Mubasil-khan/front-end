import React from "react";
import Image from "next/image";
import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  Pin,
  Twitter,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-green-100 rounded-t-4xl mt-6" id="Contact">
      <div className="container mx-auto p-4 py-8 grid grid-cols-1 md:grid-cols-3  lg:grid-cols-5 gap-8">
        <div className="lg:col-span-2 md:col-span-3">
          <Image src="/Image/logo.png" height={130} width={130} alt="Logo" />
          <p className="mt-4 text-sm text-green-800">
            GroceryHub is your trusted online destination for fresh and
            affordable groceries. From farm-fresh produce to daily essentials,
            we deliver quality products right to your doorstep. Shop with ease,
            save time, and enjoy a seamless grocery experience every day.
          </p>
          <div className="flex gap-6 items-center my-4">
            <Instagram className="h-6 w-6 text-green-800 cursor-pointer" />
            <Twitter className="h-6 w-6 text-green-800 cursor-pointer" />
            <Facebook className="h-6 w-6 text-green-800 cursor-pointer" />
            <Linkedin className="h-6 w-6 text-green-800 cursor-pointer" />
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-3 text-green-800">
            Quick Links
          </h3>
          <ul className="text-md flex flex-col gap-2 text-green-800">
            <li>
              <a href="/" className="hover:underline">
                Home
              </a>
            </li>
            <li>
              <a href="" className="hover:underline">
                Products
              </a>
            </li>
            <li>
              <a href="" className="hover:underline">
                About Us
              </a>
            </li>
            <li>
              <a href="" className="hover:underline">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h3 className="text-xl text-green-800 font-semibold mb-3">
            Customer Service
          </h3>
          <ul className="flex flex-col gap-2 text-green-800 text-md">
            <li>
              <a href="" className="hover:underline">
                FAQ
              </a>
            </li>
            <li>
              <a href="" className="hover:underline">
                Shipping
              </a>
            </li>
            <li>
              <a href="" className="hover:underline">
                Returns
              </a>
            </li>
            <li>
              <a href="" className="hover:underline">
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-xl font-semibold mb-3 text-green-800">
            Contact Us
          </h3>
          <div className="flex flex-col gap-3 text-md text-green-800">
            <p className="flex items-center gap-2 cursor-pointer">
              <Pin className="h-6 w-6 text-green-800" />
              123 Grocery St, Fresh City
            </p>
            <p className="flex items-center gap-2 cursor-pointer">
              <Phone className="h-6 w-6 text-green-800" /> +91 98765 43210
            </p>
            <p className="flex items-center gap-2 cursor-pointer">
              <Mail className="h-6 w-6 text-green-800" /> support@groceryhub.com
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-300  py-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} GroceryHub. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
