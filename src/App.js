import { Fragment } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Profile from './pages/dashboard/Profile';
import NoMatch from './pages/NoMatch';
import UserProfileLayout from './components/layouts/UserProfileLayout';
import BusinessLayout from './components/layouts/BusinessLayout';
import Account from './pages/business/Account';
import Signin from './pages/auth/Signin';
import Signup from './pages/auth/Signup';
import Messages from './pages/dashboard/Messages';
import FAQ from './pages/FAQ';
import ProductGrid from './components/products/ProductGrid';
import MainLayout from './components/layouts/MainLayout';
import AddPoints from './components/points/AddPoints';
import AddBusiness from './pages/business/AddBusiness';
import VerifyUsers from './pages/business/VerifyUsers';
import TestMessages from './pages/TestMessages';

function App() {
	return (
		<Fragment>
			<Routes>
				<Route path='/' element={<MainLayout />} />
				<Route index element={<Home />} />
				<Route path='frequently-asked-questions' element={<FAQ />} />
				<Route path='message' element={<TestMessages />} />

				<Route path='auth' element={<MainLayout />}>
					<Route index element={<Signin />} />
					<Route path='sign-up' element={<Signup />} />
					<Route path='*' element={<NoMatch />} />
				</Route>

				<Route path='user' element={<UserProfileLayout />}>
					<Route index element={<Profile />} />
					<Route path='products' element={<ProductGrid />} />
					<Route path='points' element={<AddPoints />} />
					<Route path='messages' element={<Messages />} />
					<Route path='add-business' element={<AddBusiness />} />
					<Route path='*' element={<NoMatch />} />
				</Route>
				<Route path='business/:id/' element={<BusinessLayout />}>
					<Route path='account' element={<Account />} />
					<Route path='verify' element={<VerifyUsers />} />
					<Route path='edit' element={<VerifyUsers />} />
					<Route path='points' element={<VerifyUsers />} />
					<Route path='*' element={<NoMatch />} />
				</Route>
				{/* https://www.youtube.com/watch?v=k4mjF4sPITE */}
			</Routes>
		</Fragment>
	);
}

export default App;
