import React, { Fragment, useState } from "react";

import { useSelector, useDispatch } from "react-redux";

import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Link, Navigate } from "react-router-dom";
import {
  deleteItemFromCartAsync,
  selectItems,
  updateCartAsync,
} from "./cartSlice";
import { deleteItemFromCart, updateCart } from "./cartAPI";

export default function Cart() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(true);
  const items = useSelector(selectItems);

  const totalAmount = items.reduce(
    (amount, item) => item.product.price + amount,
    0
  );
  const totalItems = items.reduce((total, item) => 1 + total, 0);

  const handleRemove = (e, Id) => {
    dispatch(deleteItemFromCartAsync(Id));
  };
  return (
    <>
      {!items.length && (
        <Navigate to={"/home"} replace={true}>
          {" "}
        </Navigate>
      )}
      <div>
        <div className="mx-auto my-10 max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-center text-3xl font-bold tracking-tight text-gray-900">
            Cart
          </h1>
          <div className="border-t border-gray-200 my-5 px-4 py-6 sm:px-6">
            <div className="flow-root">
              <ul role="list" className="-my-6 divide-y divide-gray-200">
                {items.map((item) => (
                  <li key={item.id} className="flex py-6">
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <img
                        src={`http://localhost:8080/${item.product.thumbnail}`}
                        alt={item.product.title}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>

                    <div className="ml-4 flex flex-1 flex-col">
                      <div>
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <h3>
                            <a href={item.href}>{item.product.title}</a>
                          </h3>
                          <p className="ml-4">{item.product.price}</p>
                        </div>
                      </div>
                      <div className="flex flex-1 items-end justify-between text-sm">
                        <div className="flex ">
                          <button
                            onClick={(e) => {
                              handleRemove(e, item.id);
                            }}
                            type="button"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
            <div className="flex justify-between text-base my-2 font-medium text-gray-900">
              <p>Subtotal</p>
              <p>${totalAmount}</p>
            </div>
            <div className="flex justify-between text-base my-2 font-medium text-gray-900">
              <p>Total Courses in Cart</p>
              <p>{totalItems} courses</p>
            </div>
            <p className="mt-0.5 text-sm text-gray-500">
              Taxes are calculated at checkout.
            </p>
            <div
              div
              className="mt-6 flex flex-col justify-center text-center text-sm text-gray-500"
            >
              <Link
                to={"/checkout"}
                className=" flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
              >
                Checkout
              </Link>

              <p>or</p>
              <Link to="/courses">
                <button
                  type="button"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                  onClick={() => setOpen(false)}
                >
                  Continue Purchasing
                  <span aria-hidden="true"> &rarr;</span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
