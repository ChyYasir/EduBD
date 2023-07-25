import React from "react";
import NavBar from "../features/navBar/NavBar";
import ProductList from "../features/product/components/ProductList";
import AdminProductList from "../features/admin/components/AdminProductList";
import ProductForm from "../features/admin/components/ProductForm";
import InstructorNavBar from "../features/navBar/InstructorNavBar";
import InstructorProductForm from "../features/instructor/components/InstructorProductForm";

const InstructorProductFormPage = () => {
  return (
    <div>
      <InstructorNavBar>
        <InstructorProductForm></InstructorProductForm>
      </InstructorNavBar>
    </div>
  );
};

export default InstructorProductFormPage;
