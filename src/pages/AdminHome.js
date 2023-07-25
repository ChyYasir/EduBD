import React from "react";
import NavBar from "../features/navBar/NavBar";
import ProductList from "../features/product/components/ProductList";
import AdminProductList from "../features/admin/components/AdminProductList";

const AdminHome = () => {
  return (
    <div>
      <NavBar>
        <AdminProductList></AdminProductList>
      </NavBar>
    </div>
  );
};

export default AdminHome;
