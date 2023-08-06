import React from "react";

import { useSelector } from "react-redux";
import { selectLoggedInUser } from "../features/auth/authSlice";
import UserNavBar from "../features/navBar/UserNavBar";
import Cart from "../features/cart/Cart";
import Footer from "../features/common/Footer";

const CartPage = () => {
  const user = useSelector(selectLoggedInUser);
  return (
    <>
      {user && (
        <UserNavBar>
          <Cart></Cart>
        </UserNavBar>
      )}
      <Footer></Footer>
    </>
  );
};

export default CartPage;
