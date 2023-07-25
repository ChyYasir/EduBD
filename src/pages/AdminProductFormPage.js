import React from "react";
import NavBar from "../features/navBar/NavBar";
import ProductList from "../features/product/components/ProductList";
import AdminProductList from "../features/admin/components/AdminProductList";
import ProductForm from "../features/admin/components/ProductForm";

const AdminProductFormPage = () => {
  return (
    <div>
      <NavBar>
        <ProductForm></ProductForm>
      </NavBar>
    </div>
  );
};

export default AdminProductFormPage;
