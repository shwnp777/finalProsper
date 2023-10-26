import { doc, onSnapshot } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { ChatContext } from '../../context/ChatContext';
import { db } from '../../firebase-config';
import { Menu } from '@headlessui/react';

function classNames(...classes) {
	return classes.filter(Boolean).join(' ');
}

const Chats = ({ open, setOpen }) => {
	const [chats, setChats] = useState([]);

	const { currentUser } = useContext(AuthContext);
	const { dispatch } = useContext(ChatContext);

	useEffect(() => {
		const getChats = () => {
			const unsub = onSnapshot(doc(db, 'userChats', currentUser.uid), (doc) => {
				setChats(doc.data());
			});

			return () => {
				unsub();
			};
		};

		currentUser.uid && getChats();
	}, [currentUser.uid]);

	const handleSelect = (u) => {
		dispatch({ type: 'CHANGE_USER', payload: u });
	};

	return (
		<div className='chats'>
			<ul className='flex-1 divide-y divide-gray-200 overflow-y-auto'>
				{Object.entries(chats)
					?.sort((a, b) => b[1].date - a[1].date)
					.map((chat) => (
						<li
							key={chat[0]}
							onClick={() => {
								handleSelect(chat[1].userInfo);
								setOpen(false);
							}}
						>
							<div className='group relative flex items-center px-5 py-6'>
								<div
									className='absolute inset-0 group-hover:bg-gray-50'
									aria-hidden='true'
								/>
								<div className='relative flex min-w-0 flex-1 items-center'>
									<span className='relative inline-block flex-shrink-0'>
										<img
											className='h-10 w-10 rounded-full'
											src={chat[1].userInfo.photoURL}
											alt=''
										/>
										<span
											className={classNames(
												4 === 4 ? 'bg-green-400' : 'bg-gray-300',
												'absolute top-0 right-0 block h-2.5 w-2.5 rounded-full ring-2 ring-white'
											)}
											aria-hidden='true'
										/>
									</span>
									<div className='ml-4 truncate'>
										<p className='truncate text-sm font-medium text-gray-900'>
											{chat[1].userInfo.displayName}
										</p>
										<p className='truncate text-sm text-gray-500'>
											{chat[1].lastMessage?.text}
										</p>
									</div>
								</div>

								<Menu
									as='div'
									className='relative ml-2 inline-block flex-shrink-0 text-left'
								></Menu>
							</div>
						</li>
					))}
			</ul>
		</div>
	);
};

export default Chats;
