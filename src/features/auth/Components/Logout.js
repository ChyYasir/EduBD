import { useEffect } from "react";

import { selectLoggedInUser, signOutAsync } from "../authSlice";

import { useDispatch, useSelector } from "react-redux";

import { Navigate } from "react-router-dom";
import {
  selectLoggedInInstructor,
  signOutInstructorAsync,
} from "../../instructor/instructorSlice";

function Logout() {
  const dispatch = useDispatch();

  const user = useSelector(selectLoggedInUser);
  const instructor = useSelector(selectLoggedInInstructor);

  useEffect(() => {
    if (user) {
      dispatch(signOutAsync(user.id));
    }
    if (instructor) {
      dispatch(signOutInstructorAsync(instructor.id));
    }
  });

  // but useEffect runs after render, so we have to delay navigate part

  return <>{!user && <Navigate to="/" replace={true}></Navigate>}</>;
}

export default Logout;
