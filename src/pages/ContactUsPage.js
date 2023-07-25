import React, { useEffect } from "react";
import NavBar from "../features/navBar/NavBar";
import ProductList from "../features/product/components/ProductList";
import { useDispatch, useSelector } from "react-redux";
import { clearError, selectLoggedInUser } from "../features/auth/authSlice";
import UserNavBar from "../features/navBar/UserNavBar";
import { selectLoggedInInstructor } from "../features/instructor/instructorSlice";
import InstructorNavBar from "../features/navBar/InstructorNavBar";
import ContactUs from "../features/common/ContactUs";

const ContactUsPage = () => {
  const user = useSelector(selectLoggedInUser);
  const instructor = useSelector(selectLoggedInInstructor);
  return (
    <>
      {user && (
        <div>
          <UserNavBar>
            <ContactUs></ContactUs>
          </UserNavBar>
        </div>
      )}
      {instructor && (
        <div>
          <InstructorNavBar>
            <ContactUs></ContactUs>
          </InstructorNavBar>
        </div>
      )}
      {!user && !instructor && (
        <NavBar>
          <ContactUs></ContactUs>
        </NavBar>
      )}
    </>
  );
};

export default ContactUsPage;
