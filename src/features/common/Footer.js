import React from "react";

const Footer = () => {
  return (
    <>
      <footer className="bg-gray-800 pt-10  w-full">
        <div className="max-w-6xl m-auto text-gray-800 flex flex-wrap justify-left">
          {/* Col-1 */}
          <div className="p-5 w-1/2 sm:w-4/12 md:w-3/12">
            {/* Col Title */}
            <div className="text-xs uppercase text-gray-400 font-medium mb-6">
              EduBD
            </div>
            <div>
              <p className="my-3 block text-gray-300 hover:text-gray-100 text-sm font-medium duration-700">
                Top Learning Experiences that create more talent in the world
              </p>
            </div>
          </div>
          {/* Col-2 */}
          <div className="p-5 w-1/2 sm:w-4/12 md:w-3/12">
            {/* Col Title */}
            <div className="text-xs uppercase text-gray-400 font-medium mb-6">
              Legal
            </div>
            {/* Links */}
            <a
              href="#"
              className="my-3 block text-gray-300 hover:text-gray-100 text-sm font-medium duration-700"
            >
              Terms
            </a>
            <a
              href="#"
              className="my-3 block text-gray-300 hover:text-gray-100 text-sm font-medium duration-700"
            >
              Privacy
            </a>
            <a
              href="#"
              className="my-3 block text-gray-300 hover:text-gray-100 text-sm font-medium duration-700"
            >
              Cookies
            </a>
            <a
              href="#"
              className="my-3 block text-gray-300 hover:text-gray-100 text-sm font-medium duration-700"
            >
              Contact
            </a>
          </div>
          {/* Col-3 */}
          <div className="p-5 w-1/2 sm:w-4/12 md:w-3/12">
            {/* Col Title */}
            <div className="text-xs uppercase text-gray-400 font-medium mb-6">
              Product
            </div>
            {/* Links */}
            <a
              href="#"
              className="my-3 block text-gray-300 hover:text-gray-100 text-sm font-medium duration-700"
            >
              Overview
            </a>
            <a
              href="#"
              className="my-3 block text-gray-300 hover:text-gray-100 text-sm font-medium duration-700"
            >
              Features
            </a>
            <a
              href="#"
              className="my-3 block text-gray-300 hover:text-gray-100 text-sm font-medium duration-700"
            >
              Solutions
            </a>
            <a
              href="#"
              className="my-3 block text-gray-300 hover:text-gray-100 text-sm font-medium duration-700"
            >
              Tutorials
            </a>
            <a
              href="#"
              className="my-3 block text-gray-300 hover:text-gray-100 text-sm font-medium duration-700"
            >
              Customizing Spacing
            </a>
            <a
              href="#"
              className="my-3 block text-gray-300 hover:text-gray-100 text-sm font-medium duration-700"
            >
              Pricing
            </a>
          </div>
          {/* Col-3 */}
          <div className="p-5 w-1/2 sm:w-4/12 md:w-3/12">
            {/* Col Title */}
            <div className="text-xs uppercase text-gray-400 font-medium mb-6">
              Community
            </div>
            {/* Links */}
            <a
              href="#"
              className="my-3 block text-gray-300 hover:text-gray-100 text-sm font-medium duration-700"
            >
              GitHub
            </a>
            <a
              href="#"
              className="my-3 block text-gray-300 hover:text-gray-100 text-sm font-medium duration-700"
            >
              Discord
            </a>
            <a
              href="#"
              className="my-3 block text-gray-300 hover:text-gray-100 text-sm font-medium duration-700"
            >
              Twitter
            </a>
            <a
              href="#"
              className="my-3 block text-gray-300 hover:text-gray-100 text-sm font-medium duration-700"
            >
              YouTube
            </a>
          </div>
        </div>
        {/* Copyright Bar */}
        <div className="pt-2">
          <div className="flex pb-5 px-3 m-auto pt-5 border-t border-gray-500 text-gray-400 text-sm flex-col md:flex-row max-w-6xl">
            <div className="mt-2">
              © Copyright 2023-Now. All Rights Reserved.
            </div>
            {/* Required Unicons (if you want) */}
            <div className="md:flex-auto md:flex-row-reverse mt-2 flex-row flex">
              <a href="#" className="w-6 mx-1">
                <i className="uil uil-facebook-f" />
              </a>
              <a href="#" className="w-6 mx-1">
                <i className="uil uil-twitter-alt" />
              </a>
              <a href="#" className="w-6 mx-1">
                <i className="uil uil-youtube" />
              </a>
              <a href="#" className="w-6 mx-1">
                <i className="uil uil-linkedin" />
              </a>
              <a href="#" className="w-6 mx-1">
                <i className="uil uil-instagram" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
