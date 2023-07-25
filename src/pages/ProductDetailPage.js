import React from "react";
import NavBar from "../features/navBar/NavBar";
import ProductDetail from "../features/product/components/ProductDetail";
import UserNavBar from "../features/navBar/UserNavBar";
import { useSelector } from "react-redux";
import { selectLoggedInUser } from "../features/auth/authSlice";
import { selectLoggedInInstructor } from "../features/instructor/instructorSlice";
import InstructorNavBar from "../features/navBar/InstructorNavBar";

const ProductDetailPage = () => {
  const user = useSelector(selectLoggedInUser);
  const instructor = useSelector(selectLoggedInInstructor);
  return (
    <>
      {user && (
        <UserNavBar>
          <ProductDetail></ProductDetail>
        </UserNavBar>
      )}
      {instructor && (
        <InstructorNavBar>
          <ProductDetail></ProductDetail>
        </InstructorNavBar>
      )}
      {!user && !instructor && (
        <NavBar>
          <ProductDetail></ProductDetail>
        </NavBar>
      )}
    </>
  );
};

export default ProductDetailPage;
