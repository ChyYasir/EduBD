import React, { useEffect } from "react";

import UserNavBar from "../features/navBar/UserNavBar";
import Home from "../features/common/Home";
import Footer from "../features/common/Footer";
import InstructorNavBar from "../features/navBar/InstructorNavBar";

const InstructorHomePage = () => {
  return (
    <div>
      <InstructorNavBar>
        <Home></Home>
      </InstructorNavBar>

      <Footer></Footer>
    </div>
  );
};

export default InstructorHomePage;
