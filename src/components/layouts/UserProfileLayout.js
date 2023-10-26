import React, { Fragment, useContext, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import UserNavigation from '../navigation/UserNavigation';

const UserProfileLayout = () => {
	let navigate = useNavigate();
	const { currentUser } = useContext(AuthContext);

	useEffect(() => {
		if (!currentUser) {
			navigate('/auth');
		}
	}, [currentUser, navigate]);

	return (
		<Fragment>
			<UserNavigation />
			<div className='user-layout'>
				<Outlet />
			</div>
		</Fragment>
	);
};

export default UserProfileLayout;
