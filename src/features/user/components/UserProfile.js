import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  increment,
  incrementAsync,
  selectUserInfo,
  updateUserAsync,
} from "../userSlice";
import { useForm } from "react-hook-form";

export default function UserProfile() {
  const dispatch = useDispatch();
  const user = useSelector(selectUserInfo);

  console.log(user.id);
  const [selectedEditIndex, setSelectedEditIndex] = useState(-1);
  const [showAddAddressForm, setShowAddAddressForm] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm();
  const handleEdit = (addressUpdate, index) => {
    const newUser = { ...user, addresses: [...user.addresses] };
    newUser.addresses.splice(index, 1, addressUpdate);
    dispatch(updateUserAsync(newUser));
    setSelectedEditIndex(-1);
  };
  const handleRemove = (e, index) => {
    const newUser = { ...user, addresses: [...user.addresses] };
    newUser.addresses.splice(index, 1);
    dispatch(updateUserAsync(newUser));
  };
  const handleEditForm = (index) => {
    setShowAddAddressForm(false);
    setSelectedEditIndex(index);
    const address = user.addresses[index];
    setValue("name", address.name);
    setValue("email", address.email);
    setValue("city", address.city);
    setValue("state", address.state);
    setValue("pinCode", address.pinCode);
    setValue("phone", address.phone);
    setValue("street", address.street);
  };
  const handleAdd = (address) => {
    const newUser = { ...user, addresses: [...user.addresses, address] };
    dispatch(updateUserAsync(newUser));
    setShowAddAddressForm(false);
  };
  return (
    <div>
      <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
        <div className="bg-white">
          <div className="container mx-auto my-5 p-5">
            <div className="md:flex no-wrap md:-mx-2 ">
              {/* Left Side */}
              <div className="w-full md:w-3/12 md:mx-2">
                {/* Profile Card */}
                <div className=" bg-gray-100 p-3 border-t-4 border-green-400">
                  <div className="text-center">
                    <img
                      src={`http://localhost:8080/${user.picture}`}
                      className="mx-auto mb-4 w-32 rounded-lg border border-solid"
                      alt="Avatar"
                    />

                    <label className="w-64 flex flex-col items-center p-1 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue-500 hover:text-white">
                      <span className=" text-base leading-normal">
                        Select a Picture
                      </span>
                      <input
                        type="file"
                        // onChange={(e) => {
                        //   const pic = e.target.files[0];
                        //   console.log({ pic });
                        //   const formData = new FormData();
                        //   formData.append("id", user.id);
                        //   formData.append("name", user.name);
                        //   formData.append("email", user.email);
                        //   formData.append("password", user.password);
                        //   user.products.forEach((item, index) => {
                        //     formData.append("products[]", item);
                        //   });
                        //   formData.append("picture", pic);
                        //   console.log(formData);
                        //   dispatch(updateUserAsync(formData));
                        // }}
                        className="hidden"
                      />
                    </label>

                    <h5 className="mt-4 mb-2 text-xl font-medium leading-tight">
                      {user.name}
                    </h5>
                    <p className="text-neutral-500 dark:text-neutral-400">
                      Web designer
                    </p>
                  </div>

                  <ul className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                    <li className="flex items-center py-3">
                      <span>Status</span>
                      <span className="ml-auto">
                        <span className="bg-green-500 py-1 px-2 rounded text-white text-sm">
                          Active
                        </span>
                      </span>
                    </li>
                    <li className="flex items-center py-3">
                      <span>Member since</span>
                      <span className="ml-auto">Nov 07, 2016</span>
                    </li>
                  </ul>
                </div>
                {/* End of profile card */}
                <div className="my-4" />
              </div>
              {/* Right Side */}
              <div className="w-full md:w-9/12 mx-2 h-64">
                {/* Profile tab */}
                {/* About Section */}
                <div className="bg-white p-3 shadow-sm rounded-sm">
                  <h1 className="text-center text-3xl font-bold mb-5">
                    My Profile
                  </h1>
                  <div className="text-gray-700">
                    <div className="grid lg:grid-cols-2 text-sm">
                      <div className="lg:col-span-1 grid grid-cols-2">
                        <div className="col-span-1 px-4 py-2 font-semibold">
                          Full Name
                        </div>
                        <div className="col-span-1 px-4 py-2">{user.name}</div>
                      </div>
                      <div className="lg:col-span-1 grid grid-cols-2"></div>

                      <div className="grid grid-cols-2">
                        <div className="px-4 py-2 font-semibold">Gender</div>
                        <div className="px-4 py-2">Female</div>
                      </div>
                      <div className="grid grid-cols-2">
                        <div className="px-4 py-2 font-semibold">
                          Contact No.
                        </div>
                        <div className="px-4 py-2">+11 998001001</div>
                      </div>
                      <div className="grid grid-cols-2">
                        <div className="px-4 py-2 font-semibold">
                          Current Address
                        </div>
                        <div className="px-4 py-2">
                          Beech Creek, PA, Pennsylvania
                        </div>
                      </div>
                      <div className="grid grid-cols-2">
                        <div className="px-4 py-2 font-semibold">
                          Permanant Address
                        </div>
                        <div className="px-4 py-2">
                          Arlington Heights, IL, Illinois
                        </div>
                      </div>
                      <div className="grid grid-cols-2">
                        <div className="px-4 py-2 font-semibold">Email.</div>
                        <div className="px-4 py-2">
                          <a
                            className="text-blue-800"
                            href="mailto:jane@example.com"
                          >
                            {user.email}
                          </a>
                        </div>
                      </div>
                      <div className="grid grid-cols-2">
                        <div className="px-4 py-2 font-semibold">Birthday</div>
                        <div className="px-4 py-2">Feb 06, 1998</div>
                      </div>
                    </div>
                  </div>
                  <button className="block w-full text-blue-800 text-sm font-semibold rounded-lg hover:bg-gray-100 focus:outline-none focus:shadow-outline focus:bg-gray-100 hover:shadow-xs p-3 my-4">
                    Show Full Information
                  </button>
                </div>
                {/* End of about section */}
                <div className="my-4" />
                {/* Experience and education */}
                <div className="bg-white p-3 shadow-sm rounded-sm">
                  <div className="grid grid-cols-2">
                    <div>
                      <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
                        <span clas="text-green-500">
                          <svg
                            className="h-5"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            />
                          </svg>
                        </span>
                        <span className="tracking-wide">Experience</span>
                      </div>
                      <ul className="list-inside space-y-2">
                        <li>
                          <div className="text-teal-600">
                            Owner at Her Company Inc.
                          </div>
                          <div className="text-gray-500 text-xs">
                            March 2020 - Now
                          </div>
                        </li>
                        <li>
                          <div className="text-teal-600">
                            Owner at Her Company Inc.
                          </div>
                          <div className="text-gray-500 text-xs">
                            March 2020 - Now
                          </div>
                        </li>
                        <li>
                          <div className="text-teal-600">
                            Owner at Her Company Inc.
                          </div>
                          <div className="text-gray-500 text-xs">
                            March 2020 - Now
                          </div>
                        </li>
                        <li>
                          <div className="text-teal-600">
                            Owner at Her Company Inc.
                          </div>
                          <div className="text-gray-500 text-xs">
                            March 2020 - Now
                          </div>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
                        <span clas="text-green-500">
                          <svg
                            className="h-5"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path fill="#fff" d="M12 14l9-5-9-5-9 5 9 5z" />
                            <path
                              fill="#fff"
                              d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                            />
                          </svg>
                        </span>
                        <span className="tracking-wide">Education</span>
                      </div>
                      <ul className="list-inside space-y-2">
                        <li>
                          <div className="text-teal-600">
                            Masters Degree in Oxford
                          </div>
                          <div className="text-gray-500 text-xs">
                            March 2020 - Now
                          </div>
                        </li>
                        <li>
                          <div className="text-teal-600">
                            Bachelors Degreen in LPU
                          </div>
                          <div className="text-gray-500 text-xs">
                            March 2020 - Now
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                  {/* End of Experience and education grid */}
                </div>
                {/* End of profile tab */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
