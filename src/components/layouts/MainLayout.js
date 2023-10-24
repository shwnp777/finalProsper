import React, { Fragment, useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import MainNavigation from "../navigation/MainNavigation";

const MainLayout = () => {
  let navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    if (currentUser) {
      navigate("/user");
    }
  }, [currentUser, navigate]);

  return (
    <Fragment>
      <MainNavigation />
      <div className="p-7">
        <Outlet />
      </div>
    </Fragment>
  );
};

export default MainLayout;
