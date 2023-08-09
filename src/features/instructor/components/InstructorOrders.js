import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { selectLoggedInUser } from "../../auth/authSlice";
import { selectInstructorInfo } from "../instructorSlice";
import {
  fetchAllProductsAsync,
  selectAllProducts,
} from "../../product/productSlice";
import { fetchAllProducts } from "../../product/productAPI";
import { Link } from "react-router-dom";

export default function InstructorOrders() {
  const dispatch = useDispatch();
  const instructorInfo = useSelector(selectInstructorInfo);
  const products = useSelector(selectAllProducts);
  console.log(instructorInfo);
  useEffect(() => {
    dispatch(fetchAllProductsAsync());
  }, [dispatch]);
  let instructorProducts = [];
  // console.log(products);
  for (let i = 0; i < products.length; i++) {
    if (products[i].instructor === instructorInfo.id) {
      instructorProducts.push(products[i]);
    }
  }
  console.log(instructorProducts);
  // useEffect(() => {
  //   dispatch(fetchLoggedInUserOrdersAsync(instructorInfo.id));
  // }, [dispatch, instructorInfo]);

  return (
    <div className="mx-auto mt-12 bg-white max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
        <h1 className="text-4xl my-5 font-bold tracking-tight text-gray-900 text-center">
          My Courses
        </h1>

        <div className="mx-auto mt-12 bg-white max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
            <div className="flow-root">
              <ul role="list" className="-my-6 divide-y divide-gray-200">
                {instructorProducts.map((product) => (
                  <li key={product.id} className="flex py-6">
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <img
                        src={`http://localhost:8080/${product.thumbnail}`}
                        alt={product.title}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>

                    <div className="ml-4 flex flex-1 flex-col">
                      <div>
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <div>
                            <h3>
                              <a href={product.id}>{product.title}</a>
                            </h3>
                            <p className="mt-1 text-sm text-gray-500">
                              {product.brand}
                            </p>
                          </div>

                          <div className="felx flex-col space-y-4">
                            <div>
                              <Link
                                to={`/instructor/product-form/edit/${product.id}`}
                                className="rounded-md text-center bg-indigo-600 px-3 py-2 mb-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 hover:cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                              >
                                Edit
                              </Link>
                            </div>
                            <div>
                              <Link
                                type="button"
                                className="rounded-md  text-center bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500  hover:cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                              >
                                Delete
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
