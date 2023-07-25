import React, { useEffect } from "react";

import UserNavBar from "../features/navBar/UserNavBar";
import Home from "../features/common/Home";
import Footer from "../features/common/Footer";

const UserHomePage = () => {
  return (
    <div>
      <UserNavBar>
        <Home></Home>
      </UserNavBar>
      <Footer></Footer>
    </div>
  );
};

export default UserHomePage;
