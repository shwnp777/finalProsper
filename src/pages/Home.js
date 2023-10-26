import React, { useContext } from 'react';
// import UserNavigation from "../components/navigation/UserNavigation";
// import ActionCall from "../components/splashComponents/ActionCall";
// import Incentives from "../components/splashComponents/Incentives";
// import SupportSection from "../components/splashComponents/SupportSection";
import MainNavigation from '../components/navigation/MainNavigation';
import { AuthContext } from './../context/AuthContext';
import HomeHeader from '../components/splashComponents/HomeHeader';

const Home = () => {
	const { currentUser } = useContext(AuthContext);

	return (
		<div>
			<MainNavigation />
			<div className='main-header'>
				<HomeHeader />
			</div>
			{/* <SupportSection />
      <Incentives />
      <ActionCall /> */}
		</div>
	);
};

export default Home;
