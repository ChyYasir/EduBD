import React, { useEffect } from "react";

import { Counter } from "./features/counter/Counter";
import "./App.css";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import ProductList from "./features/product/components/ProductList";
import Home from "./pages/UserHomePage";
import LoginPage from "./pages/LoginPage";
import Signup from "./features/auth/Components/Signup";
import Cart from "./features/cart/Cart";
import CartPage from "./pages/CartPage";
import Checkout from "./pages/Checkout";
import ProductDetail from "./features/product/components/ProductDetail";
import ProductDetailPage from "./pages/ProductDetailPage";
import { useDispatch, useSelector } from "react-redux";
import { clearError, selectLoggedInUser } from "./features/auth/authSlice";
import { fetchItemsByUserId } from "./features/cart/cartAPI";
import { fetchItemsByUserIdAsync } from "./features/cart/cartSlice";
import PageNotFound from "./pages/404";
import OrderSuccessPage from "./pages/OrderSuccessPage";
import UserOrdersPage from "./pages/UserOrdersPage";
import { fetchLoggedInUserAsync } from "./features/user/userSlice";
import UserProfilePage from "./pages/UserProfilePage";
import Protected from "./features/auth/Components/Protected";
import ProtectedAdmin from "./features/auth/Components/ProtectedAdmin";
import AdminHome from "./pages/AdminHome";
import AdminProductFormPage from "./pages/AdminProductFormPage";
import Logout from "./features/auth/Components/Logout";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import Login2 from "./features/auth/Components/Login";
import CoursesPage from "./pages/CoursesPage";
import UserHomePage from "./pages/UserHomePage";
import HomePage from "./pages/HomePage";
import Signup2 from "./features/auth/Components/Signup-copy";
import InstructorHomePage from "./pages/InstructorHomePage";
import ProtectedInstructor from "./features/auth/Components/ProtectedInstructor";
import { selectLoggedInInstructor } from "./features/instructor/instructorSlice";
import InstructorProductFormPage from "./pages/InstructorProductFormPage";
import ContactUsPage from "./pages/ContactUsPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage></HomePage>,
  },
  {
    path: "/home",
    element: (
      <Protected>
        <UserHomePage></UserHomePage>
      </Protected>
    ),
  },
  {
    path: "/instructor/home",
    element: (
      <ProtectedInstructor>
        <InstructorHomePage></InstructorHomePage>
      </ProtectedInstructor>
    ),
  },
  {
    path: "/courses",
    element: <CoursesPage></CoursesPage>,
  },
  {
    path: "/contactus",
    element: <ContactUsPage></ContactUsPage>,
  },
  {
    path: "/admin",
    element: (
      <ProtectedAdmin>
        <AdminHome></AdminHome>
      </ProtectedAdmin>
    ),
  },
  {
    path: "/instructor/product-form",
    element: (
      <ProtectedInstructor>
        <InstructorProductFormPage></InstructorProductFormPage>
      </ProtectedInstructor>
    ),
  },
  {
    path: "/admin/product-form/edit/:id",
    element: (
      <ProtectedAdmin>
        <AdminProductFormPage></AdminProductFormPage>
      </ProtectedAdmin>
    ),
  },
  {
    path: "/login",
    // element: <LoginPage />,
    element: <LoginPage></LoginPage>,
  },
  {
    path: "/signup",
    element: <Signup2></Signup2>,
  },
  {
    path: "/cart",
    element: (
      <Protected>
        <CartPage />
      </Protected>
    ),
  },
  {
    path: "/checkout",
    element: <Checkout></Checkout>,
  },
  {
    path: "/product-detail/:id",
    element: <ProductDetailPage></ProductDetailPage>,
  },
  {
    path: "/order-success/:id",
    element: <OrderSuccessPage />,
  },
  {
    path: "/order",
    element: <UserOrdersPage></UserOrdersPage>,
  },
  {
    path: "/profile",
    element: <UserProfilePage></UserProfilePage>,
  },
  {
    path: "/logout",
    element: <Logout></Logout>,
  },
  {
    path: "/forgot-password",
    element: <ForgotPasswordPage></ForgotPasswordPage>,
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);
function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
  console.log(user);
  const instructor = useSelector(selectLoggedInInstructor);
  useEffect(() => {
    if (user) {
      dispatch(fetchItemsByUserIdAsync(user.id));
      dispatch(fetchLoggedInUserAsync(user.id));
      dispatch(clearError());
    }
  }, [dispatch, user]);
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
