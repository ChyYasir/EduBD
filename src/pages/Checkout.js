import React, { Fragment, useState } from "react";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { Link, Navigate } from "react-router-dom";

import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteItemFromCartAsync,
  selectItems,
  updateCartAsync,
} from "../features/cart/cartSlice";
import { useForm } from "react-hook-form";
import {
  selectLoggedInUser,
  updateUserAsync,
} from "../features/auth/authSlice";
import { createOrder } from "../features/order/orderAPI";
import {
  createOrderAsync,
  selectCurrentOrder,
} from "../features/order/orderSlice";

const Checkout = () => {
  const items = useSelector(selectItems);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("MFS");

  const user = useSelector(selectLoggedInUser);
  const currentOrder = useSelector(selectCurrentOrder);

  const totalAmount = items.reduce(
    (amount, item) => item.price * item.quantity + amount,
    0
  );
  const totalItems = items.reduce((total, item) => item.quantity + total, 0);
  const handleQuantity = (e, item) => {
    dispatch(updateCartAsync({ ...item, quantity: +e.target.value }));
  };

  const handleRemove = (e, id) => {
    dispatch(deleteItemFromCartAsync(id));
  };
  const handleAddress = (e) => {
    setSelectedAddress(user.addresses[e.target.value]);
  };
  const handlePayment = (e) => {
    console.log(e.target.value);
    setPaymentMethod(e.target.value);
  };

  const handleOrder = (e) => {
    dispatch(
      createOrderAsync({
        items,
        totalAmount,
        totalItems,
        user,
        paymentMethod,
      })
    );
  };
  const [open, setOpen] = useState(true);
  return (
    <>
      {!items.length && (
        <Navigate to={"/"} replace={true}>
          {" "}
        </Navigate>
      )}
      {currentOrder && (
        <Navigate to={`/order-success/${currentOrder.id}`} replace={true}>
          {" "}
        </Navigate>
      )}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <div className="mt-6 space-y-6">
              <h1 className="text-2xl">Choose a Payment Method</h1>
              <div className="flex items-center gap-x-3">
                <input
                  id="MFS"
                  onChange={handlePayment}
                  value={"MFS"}
                  name="payments"
                  type="radio"
                  checked={paymentMethod === "MFS"}
                  className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                />
                <label
                  htmlFor="MFS"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  MFS
                </label>
              </div>
              <div className="flex items-center gap-x-3">
                <input
                  id="card"
                  onChange={handlePayment}
                  value={"card"}
                  name="payments"
                  type="radio"
                  checked={paymentMethod === "card"}
                  className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                />
                <label
                  htmlFor="card"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Card
                </label>
              </div>
            </div>
          </div>
          <div className="lg:col-span-2">
            <div className="mx-auto my-10 bg-white max-w-7xl px-4 sm:px-6 lg:px-8">
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
                            src={item.thumbnail}
                            alt={item.title}
                            className="h-full w-full object-cover object-center"
                          />
                        </div>

                        <div className="ml-4 flex flex-1 flex-col">
                          <div>
                            <div className="flex justify-between text-base font-medium text-gray-900">
                              <h3>
                                <a href={item.href}>{item.title}</a>
                              </h3>
                              <p className="ml-4">{item.price}</p>
                            </div>
                            <p className="mt-1 text-sm text-gray-500">
                              {item.color}
                            </p>
                          </div>
                          <div className="flex flex-1 items-end justify-between text-sm">
                            <div className="flex">
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
                  <p>Total Items in Cart</p>
                  <p>{totalItems} items</p>
                </div>
                <p className="mt-0.5 text-sm text-gray-500">
                  Shipping and taxes calculated at checkout.
                </p>
                <div className="cursor-pointer mt-6">
                  <div
                    onClick={handleOrder}
                    className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                  >
                    Enroll
                  </div>
                </div>
                <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                  <p>
                    or
                    <Link to="/courses">
                      <button
                        type="button"
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                        onClick={() => setOpen(false)}
                      >
                        Continue Shopping
                        <span aria-hidden="true"> &rarr;</span>
                      </button>
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
