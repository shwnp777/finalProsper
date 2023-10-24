import React, { useContext } from "react";
// import UserNavigation from "../components/navigation/UserNavigation";
// import ActionCall from "../components/splashComponents/ActionCall";
// import Incentives from "../components/splashComponents/Incentives";
// import SupportSection from "../components/splashComponents/SupportSection";
import MainNavigation from "../components/navigation/MainNavigation";
import { AuthContext } from "./../context/AuthContext";

const Home = () => {
  const { currentUser } = useContext(AuthContext);
  console.log(currentUser);
  return (
    <div style={{}} className="">
      <MainNavigation />

      {/* <SupportSection />
      <Incentives />
      <ActionCall /> */}
    </div>
  );
};

export default Home;
