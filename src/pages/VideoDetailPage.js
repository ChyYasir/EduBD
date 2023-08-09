import React from "react";
import NavBar from "../features/navBar/NavBar";
import ProductDetail from "../features/product/components/ProductDetail";
import UserNavBar from "../features/navBar/UserNavBar";
import { useSelector } from "react-redux";
import { selectLoggedInUser } from "../features/auth/authSlice";
import { selectLoggedInInstructor } from "../features/instructor/instructorSlice";
import InstructorNavBar from "../features/navBar/InstructorNavBar";
import VideoDetail from "../features/product/components/VideoDetail";

const VideoDetailPage = () => {
  const user = useSelector(selectLoggedInUser);
  const instructor = useSelector(selectLoggedInInstructor);
  return (
    <>
      {user && (
        <UserNavBar>
          <VideoDetail></VideoDetail>
        </UserNavBar>
      )}
      {instructor && (
        <InstructorNavBar>
          <VideoDetail></VideoDetail>
        </InstructorNavBar>
      )}
      {!user && !instructor && (
        <NavBar>
          <VideoDetail></VideoDetail>
        </NavBar>
      )}
    </>
  );
};

export default VideoDetailPage;
