import React, { useEffect } from "react";
import NavBar from "../features/navBar/NavBar";
import ProductList from "../features/product/components/ProductList";
import { useDispatch, useSelector } from "react-redux";
import { clearError, selectLoggedInUser } from "../features/auth/authSlice";
import Home from "../features/common/Home";
import Footer from "../features/common/Footer";
import { selectLoggedInInstructor } from "../features/instructor/instructorSlice";
import UserNavBar from "../features/navBar/InstructorNavBar";
import InstructorNavBar from "../features/navBar/InstructorNavBar";

const HomePage = () => {
  const user = useSelector(selectLoggedInUser);
  const instructor = useSelector(selectLoggedInInstructor);
  // console.log(user);
  // console.log(instructor);
  return (
    <>
      <NavBar>
        <Home></Home>
      </NavBar>

      <Footer></Footer>
    </>
  );
};

export default HomePage;
