import React from "react";
import { useSelector } from "react-redux";
import { selectLoggedInUser } from "../authSlice";
import { Navigate } from "react-router-dom";
import { selectLoggedInInstructor } from "../../instructor/instructorSlice";

function ProtectedInstructor({ children }) {
  const instructor = useSelector(selectLoggedInInstructor);
  if (!instructor) {
    return <Navigate to={"/login"}></Navigate>;
  }
  return children;
}

export default ProtectedInstructor;
