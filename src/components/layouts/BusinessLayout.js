import React, { Fragment, useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import UserNavigation from "../navigation/UserNavigation";
import BusinessNavigation from "../navigation/BusinessNavigation";

const BusinessLayout = () => {
  let navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    if (!currentUser) {
      navigate("/auth");
    } else if (currentUser.role !== 3) {
      navigate("/user");
    }
  }, [currentUser, navigate]);

  return (
    <Fragment>
      <UserNavigation />
      <BusinessNavigation />
      <div className="p-7">
        <Outlet />
      </div>
    </Fragment>
  );
};

export default BusinessLayout;
