import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { checkUserAsync, selectError, selectLoggedInUser } from "../authSlice";
import { Link, Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import "./auth.css";
import {
  checkInstructorAsync,
  selectLoggedInInstructor,
} from "../../instructor/instructorSlice";
export default function Login() {
  const dispatch = useDispatch();
  const error = useSelector(selectError);
  const user = useSelector(selectLoggedInUser);
  const instructor = useSelector(selectLoggedInInstructor);
  const [loginAs, setLoginAs] = useState("learner");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  console.log(errors);
  const handleLoginAs = (e) => {
    console.log(e.target.value);
    setLoginAs(e.target.value);
  };
  return (
    <>
      {user && <Navigate to="/home" replace={true}></Navigate>}
      {instructor && <Navigate to="/instructor/home" replace={true}></Navigate>}
      <div className="relative min-h-screen flex ">
        <div className="flex flex-col sm:flex-row items-center md:items-start sm:justify-center md:justify-start flex-auto min-w-0 bg-white">
          <div
            className="sm:w-1/2 xl:w-3/5 h-full hidden md:flex flex-auto items-center justify-center p-10 overflow-hidden bg-no-repeat bg-cover relative"
            // style={{
            //   backgroundImage:
            //     "url(https://images.unsplash.com/photo-1579451861283-a2239070aaa9?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80)",
            // }}
          >
            {/* <div className="absolute bg-gradient-to-b dummy opacity-75 inset-0 z-0" /> */}
            <div className="w-full  max-w-2xl ">
              <div className="sm:text-4xl xl:text-6xl text-primary  text-center font-bold leading-tight mb-6">
                EduBD
              </div>
              <div className="sm:text-xl xl:text-2xl text-black text-center font-normal">
                The Platform that provides top Learning Experiences that create
                more talent in the world
              </div>
            </div>
          </div>
          <div className="md:flex md:items-center md:justify-center w-full sm:w-auto md:h-full w-2/5 xl:w-2/5 p-8  md:p-10 lg:p-14 sm:rounded-lg md:rounded-none bg-white">
            <div className="max-w-md w-full space-y-8">
              <div className="text-center">
                <h2 className="mt-6 text-3xl font-bold text-gray-900">
                  Welcome Back!
                </h2>
                <p className="mt-2 text-sm text-gray-500">
                  Please log in to your account
                </p>
              </div>
              <div className="flex flex-col items-center">
                <div>
                  <h1 className="text-1xl font-bold">LOGIN AS</h1>
                </div>
                <div>
                  <div className="mt-3 flex space-x-5 mb-3">
                    <div className="flex items-center gap-x-3">
                      <input
                        id="learner"
                        onChange={handleLoginAs}
                        value={"learner"}
                        name="payments"
                        type="radio"
                        checked={loginAs === "learner"}
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
                        onChange={handleLoginAs}
                        value={"instructor"}
                        name="payments"
                        type="radio"
                        checked={loginAs === "instructor"}
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
                  if (loginAs === "learner") {
                    dispatch(
                      checkUserAsync({
                        email: data.email,
                        password: data.password,
                      })
                    );
                  } else {
                    dispatch(
                      checkInstructorAsync({
                        email: data.email,
                        password: data.password,
                      })
                    );
                  }
                })}
                className="mt-8 space-y-6"
                action="#"
                method="POST"
              >
                <input type="hidden" name="remember" defaultValue="true" />
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
                        message: "email not valid",
                      },
                    })}
                    className=" mt-2 w-full text-base px-4 py-2 border border-gray-300 focus:outline-none rounded-2xl focus:border-indigo-500"
                    type="email"
                    placeholder="Email Address"
                  />
                </div>
                <div>
                  <div className="mt-8 content-center">
                    <label
                      htmlFor="email"
                      className="ml-3 text-sm font-bold text-gray-700 tracking-wide"
                    >
                      Password
                    </label>
                    <input
                      id="password"
                      {...register("password", {
                        required: "password is required",
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

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember_me"
                      name="remember_me"
                      type="checkbox"
                      className="h-4 w-4  focus:ring-blue-400 border-gray-300 rounded"
                    />
                    <label
                      htmlFor="remember_me"
                      className="ml-2 block text-sm text-gray-900"
                    >
                      Remember me
                    </label>
                  </div>
                  <div className="text-sm">
                    <Link
                      to="/forgot-password"
                      className="text-indigo-400 hover:text-blue-500"
                    >
                      Forgot your password?
                    </Link>
                  </div>
                </div>
                <div>
                  <button
                    type="submit"
                    className="w-full flex justify-center bg-gradient-to-r from-indigo-500 to-blue-600  hover:bg-gradient-to-l hover:from-blue-500 hover:to-indigo-600 text-gray-100 p-4  rounded-full tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500"
                  >
                    Log in
                  </button>
                </div>
                <p className="flex flex-col items-center justify-center mt-10 text-center text-md text-gray-500">
                  <span>Don't have an account?</span>
                  <Link to="/signup">
                    <div className=" w-full rounded-full  bg-green-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                      Sign Up
                    </div>
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
