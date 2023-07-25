import React from "react";
import Login from "../features/auth/Components/Login";
import Footer from "../features/common/Footer";
import NavBar from "../features/navBar/NavBar";

const LoginPage = () => {
  return (
    <>
      <NavBar>
        <Login></Login>
      </NavBar>

      <Footer></Footer>
    </>
  );
};

export default LoginPage;
