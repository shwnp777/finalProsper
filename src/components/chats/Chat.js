import React, { useContext } from 'react';

import Messages from './Messages';
import Input from './Input';
import { ChatContext } from '../../context/ChatContext';

const Chat = ({ open, setOpen }) => {
	const { data } = useContext(ChatContext);

	return (
		<div className='chat'>
			<div className='chatInfo'>
				<span>{data.user?.displayName}</span>
				<button onClick={() => setOpen(true)}>Contacts</button>
			</div>
			<Messages />
			<Input />
		</div>
	);
};

export default Chat;
