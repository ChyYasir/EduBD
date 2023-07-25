import React from "react";
import NavBar from "../features/navBar/NavBar";
import UserProfile from "../features/user/components/UserProfile";
import UserNavBar from "../features/navBar/UserNavBar";

const UserProfilePage = () => {
  return (
    <div>
      <UserNavBar>
        <h1 className="mx-auto text-2xl">My Profile</h1>
        <UserProfile></UserProfile>
      </UserNavBar>
    </div>
  );
};

export default UserProfilePage;
