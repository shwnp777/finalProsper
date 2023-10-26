import React, { useState } from 'react';
import Navbar from './Navbar';
import Search from './Search';
import Chats from './Chats';

const Sidebar = () => {
	const [Open, setOpen] = useState(true);
	return (
		<div className='sidebar'>
			<Navbar />
			<Search />
			<Chats />
		</div>
	);
};

export default Sidebar;
