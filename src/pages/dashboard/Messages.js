import React, { useState } from 'react';
import Chat from '../../components/chats/Chat';
import SideContact from '../../components/chats/SideContact';

const Messages = () => {
	const [open, setOpen] = useState(true);

	return (
		<div className='home'>
			<div className='container'>
				<Chat open={open} setOpen={setOpen} />
				<SideContact open={open} setOpen={setOpen} />
			</div>
		</div>
	);
};

export default Messages;
