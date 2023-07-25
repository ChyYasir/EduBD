import React, { useEffect } from "react";
import NavBar from "../features/navBar/NavBar";
import ProductList from "../features/product/components/ProductList";
import { useDispatch, useSelector } from "react-redux";
import { clearError, selectLoggedInUser } from "../features/auth/authSlice";
import UserNavBar from "../features/navBar/UserNavBar";
import { selectLoggedInInstructor } from "../features/instructor/instructorSlice";
import InstructorNavBar from "../features/navBar/InstructorNavBar";

const CoursesPage = () => {
  const user = useSelector(selectLoggedInUser);
  const instructor = useSelector(selectLoggedInInstructor);
  return (
    <>
      {user && (
        <div>
          <UserNavBar>
            <ProductList></ProductList>
          </UserNavBar>
        </div>
      )}
      {instructor && (
        <div>
          <InstructorNavBar>
            <ProductList></ProductList>
          </InstructorNavBar>
        </div>
      )}
      {!user && !instructor && (
        <NavBar>
          <ProductList></ProductList>
        </NavBar>
      )}
    </>
  );
};

export default CoursesPage;
