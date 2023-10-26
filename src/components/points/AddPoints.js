import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase-config';
import { sendPoints } from './pointFunctions';
import { getAllUsers } from '../../context/firebaseFunctions';
import moment from 'moment';
import PickPerson from './PickPerson';

const AddPoints = () => {
	const [pointAmount, setPointAmount] = useState(0);
	const [sel, setsel] = useState();
	const [transactionMessage, setTransactionMessage] = useState(null);
	const [selectedUser, setSelectedUser] = useState({});
	const [users, setUsers] = useState([]);
	const [errorMessage, setErrorMessage] = useState(null);
	const { currentUser } = useContext(AuthContext);

	useEffect(() => {
		const fetchBusinesses = async () => {
			const allBusinesses = await getAllUsers(db);
			setUsers(allBusinesses);
		};

		fetchBusinesses();
	}, []);

	const addPoints = (e) => {
		e.preventDefault();
		sendPoints(currentUser.uid);
	};

	console.log(selectedUser);

	// TO DO
	// ensure moment is exact time of transaction
	// ensure active user is the one in the "from" account
	// ensure proper uid from "to" account is passed

	return (
		<div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
			<div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm border-spacing-7 points-border'>
				<div>
					<h1 className='text-pink-800 text-xl font-bold pb-4'>Send Points</h1>
				</div>
				{errorMessage ? (
					<div className='bg-red-700 text-white text-center px-2 py-2 my-3 rounded-md'>
						{errorMessage}
					</div>
				) : (
					''
				)}
				<form className='space-y-6' onSubmit={addPoints}>
					<PickPerson
						selectedUser={selectedUser}
						setSelectedUser={setSelectedUser}
						users={users}
					/>
					<div>
						<label
							htmlFor='email'
							className='block text-sm font-medium leading-6 text-gray-900'
						>
							Email address
						</label>
						<div className='mt-2'>
							<input
								id='email'
								name='email'
								type='email'
								autoComplete='email'
								required
								className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
							/>
						</div>
					</div>
					<div>
						<label
							htmlFor='points'
							className='block text-sm font-medium leading-6 text-gray-900'
						>
							Point Amount
						</label>
						<div className='mt-2'>
							<input
								id='points'
								name='points'
								type='text'
								onChange={(e) => {
									if (isNaN(e.target.value)) {
										setErrorMessage('You must enter a number!');
									} else {
										setErrorMessage(null);
										setPointAmount(Number(e.target.value));
									}
								}}
								autoComplete='points'
								required
								className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
							/>
						</div>
					</div>
					<div>
						<label
							htmlFor='email'
							className='block text-sm font-medium leading-6 text-gray-900'
						>
							Transaction Note
						</label>
						<div className='mt-2'>
							<input
								id='transaction'
								name='transaction'
								type='text'
								onChange={(e) => setTransactionMessage(e.target.value)}
								autoComplete='transaction'
								required
								className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
							/>
						</div>
					</div>

					<button
						onClick={() => addPoints}
						className='bg-gray-700 rounded-md text-white py-2 px-5'
					>
						Send Points
					</button>
				</form>
			</div>
			<h3>{pointAmount}</h3>
		</div>
	);
};

export default AddPoints;
