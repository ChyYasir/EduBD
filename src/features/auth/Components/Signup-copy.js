import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  createUserAsync,
  increment,
  incrementAsync,
  selectError,
  selectLoggedInUser,
} from "../authSlice";
import { Link, Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  createInstructorAsync,
  selectLoggedInInstructor,
} from "../../instructor/instructorSlice";

export default function Signup2() {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  console.log(errors);
  const error = useSelector(selectError);
  const [signUpAs, setSignUpAs] = useState("learner");
  const user = useSelector(selectLoggedInUser);
  const instructor = useSelector(selectLoggedInInstructor);
  const handlesignUpAs = (e) => {
    console.log(e.target.value);
    setSignUpAs(e.target.value);
  };
  return (
    <>
      {/* component */}
      {user && <Navigate to="/" replace={true}></Navigate>}
      {instructor && <Navigate to="/" replace={true}></Navigate>}
      <div className="h-screen md:flex">
        <div className="relative overflow-hidden md:flex w-1/2 bg-gradient-to-tr from-blue-800 to-purple-700 i justify-around items-center hidden">
          <div>
            <h1 className="text-white font-bold text-4xl font-sans">
              GoFinance
            </h1>
            <p className="text-white mt-1">
              The most popular peer to peer lending at SEA
            </p>
            <button
              type="submit"
              className="block w-28 bg-white text-indigo-800 mt-4 py-2 rounded-2xl font-bold mb-2"
            >
              Read More
            </button>
          </div>
          <div className="absolute -bottom-32 -left-40 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8" />
          <div className="absolute -bottom-40 -left-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8" />
          <div className="absolute -top-40 -right-0 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8" />
          <div className="absolute -top-20 -right-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8" />
        </div>
        <div className="md:flex md:items-center md:justify-center w-full sm:w-auto md:h-full w-2/5 xl:w-2/5 p-8  md:p-10 lg:p-14 sm:rounded-lg md:rounded-none bg-white">
          <div className="max-w-md w-full space-y-8">
            <div className="text-center">
              <h2 className="mt-6 text-3xl font-bold text-gray-900">
                Create An Account
              </h2>
            </div>
            <div className="flex flex-col items-center">
              <div>
                <h1 className="text-1xl font-bold">SIGN UP AS</h1>
              </div>
              <div>
                <div className="mt-3 flex space-x-5 mb-3">
                  <div className="flex items-center gap-x-3">
                    <input
                      id="learner"
                      onChange={handlesignUpAs}
                      value={"learner"}
                      name="payments"
                      type="radio"
                      checked={signUpAs === "learner"}
                      className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                    <label
                      htmlFor="learner"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Learner
                    </label>
                  </div>
                  <div className="flex items-center gap-x-3">
                    <input
                      id="instructor"
                      onChange={handlesignUpAs}
                      value={"instructor"}
                      name="payments"
                      type="radio"
                      checked={signUpAs === "instructor"}
                      className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                    <label
                      htmlFor="instructor"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Instructor
                    </label>
                  </div>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <span className="h-px w-16 bg-gray-200" />

                  <span className="h-px w-16 bg-gray-200" />
                </div>
              </div>
            </div>
            <form
              noValidate
              onSubmit={handleSubmit((data) => {
                if (signUpAs === "learner") {
                  dispatch(
                    createUserAsync({
                      name: data.name,
                      email: data.email,
                      password: data.password,
                      addresses: [],
                    })
                  );
                } else {
                  dispatch(
                    createInstructorAsync({
                      name: data.name,
                      email: data.email,
                      password: data.password,
                    })
                  );
                }
              })}
              className="mt-8 space-y-4"
              action="#"
              method="POST"
            >
              <input type="hidden" name="remember" defaultValue="true" />
              <div className="relative">
                <label
                  htmlFor="name"
                  className="ml-3 text-sm font-bold text-gray-700 tracking-wide"
                >
                  Full Name
                </label>
                <input
                  id="name"
                  {...register("name", {
                    required: "name is required",
                  })}
                  className=" mt-2 w-full text-base px-4 py-2 border border-gray-300 focus:outline-none rounded-2xl focus:border-indigo-500"
                  type="name"
                  placeholder="Full Name"
                />
                {errors.name && (
                  <p className="text-red-500"> {errors.name.message}</p>
                )}
              </div>
              <div className="relative">
                <label
                  htmlFor="email"
                  className="ml-3 text-sm font-bold text-gray-700 tracking-wide"
                >
                  Email
                </label>
                <input
                  id="email"
                  {...register("email", {
                    required: "email is required",
                    pattern: {
                      value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,
                      message: "Email is not valid",
                    },
                  })}
                  className=" mt-2 w-full text-base px-4 py-2 border border-gray-300 focus:outline-none rounded-2xl focus:border-indigo-500"
                  type="email"
                  placeholder="Email Address"
                />
                {errors.email && (
                  <p className="text-red-500"> {errors.email.message}</p>
                )}
              </div>
              <div>
                <div className="content-center">
                  <label
                    htmlFor="password"
                    className="ml-3 text-sm font-bold text-gray-700 tracking-wide"
                  >
                    Password
                  </label>
                  <input
                    id="password"
                    {...register("password", {
                      required: "password is required",
                      pattern: {
                        value:
                          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
                        message: `- at least 8 characters\n
- must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number\n
- Can contain special characters`,
                      },
                    })}
                    className="mt-2 w-full content-center text-base px-4 py-2 border rounded-2xl border-gray-300 focus:outline-none focus:border-indigo-500"
                    type="password"
                    placeholder="Enter your password"
                  />
                  {errors.password && (
                    <p className="text-red-500">{errors.password.message}</p>
                  )}
                </div>
                {error && <p className="text-red-500">{error.message}</p>}
              </div>
              <div>
                <div className="content-center">
                  <label
                    htmlFor="confirmPassword"
                    className="ml-3 text-sm font-bold text-gray-700 tracking-wide"
                  >
                    Confirm Password
                  </label>
                  <input
                    id="confirmPassword"
                    {...register("confirmPassword", {
                      required: "confirm password is required",
                      validate: (value, formValues) =>
                        value === formValues.password ||
                        "Password does not match!!!",
                    })}
                    className="mt-2 w-full content-center text-base px-4 py-2 border rounded-2xl border-gray-300 focus:outline-none focus:border-indigo-500"
                    type="password"
                    placeholder="Enter your confirmPassword"
                  />
                  {errors.confirmPassword && (
                    <p className="text-red-500">
                      {" "}
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>
                {error && <p className="text-red-500">{error.message}</p>}
              </div>
              <div className="felx items-center">
                <div>
                  <button
                    type="submit"
                    className="w-1/2 flex justify-center bg-gradient-to-r from-indigo-500 to-blue-600  hover:bg-gradient-to-l hover:from-blue-500 hover:to-indigo-600 text-gray-100 p-4  rounded-xl tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500"
                  >
                    Sign Up
                  </button>
                </div>
              </div>
              <p className="flex flex-col items-center justify-center mt-10 text-center text-md text-gray-500">
                <span>Already A Member?</span>
                <Link
                  to="/login"
                  className="text-indigo-400 hover:text-blue-500 no-underline hover:underline cursor-pointer transition ease-in duration-300"
                >
                  Log In
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
