import { useState } from 'react';
import SideContact from '../components/chats/SideContact';

const TestMessages = () => {
	const [open, setOpen] = useState(true);
	return (
		<div>
			<button
				type='button'
				onClick={() => setOpen(!open)}
				className='rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
			>
				Contacts
			</button>
			<SideContact open={open} setOpen={setOpen} />
		</div>
	);
};

export default TestMessages;
