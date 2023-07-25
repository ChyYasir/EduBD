import React from "react";
import NavBar from "../features/navBar/NavBar";

import UserOrders from "../features/user/components/UserOrders";
import UserNavBar from "../features/navBar/UserNavBar";

const UserOrdersPage = () => {
  return (
    <div>
      <UserNavBar>
        <h1 className="mx-auto text-2xl text-center">My Orders</h1>

        <UserOrders></UserOrders>
      </UserNavBar>
    </div>
  );
};

export default UserOrdersPage;
