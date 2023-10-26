import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import Chats from './Chats';
import Search from './Search';

const SideContact = ({ open, setOpen }) => {
	return (
		<Transition.Root show={open} as={Fragment}>
			<Dialog as='div' className='relative z-10' onClose={setOpen}>
				<div className='fixed inset-0' />

				<div className='fixed inset-0 overflow-hidden'>
					<div className='absolute inset-0 overflow-hidden'>
						<div className='pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16'>
							<Transition.Child
								as={Fragment}
								enter='transform transition ease-in-out duration-500 sm:duration-700'
								enterFrom='translate-x-full'
								enterTo='translate-x-0'
								leave='transform transition ease-in-out duration-500 sm:duration-700'
								leaveFrom='translate-x-0'
								leaveTo='translate-x-full'
							>
								<Dialog.Panel className='pointer-events-auto w-screen max-w-md'>
									<div className='flex h-full flex-col overflow-y-scroll bg-white shadow-xl'>
										<div className='p-6'>
											<div className='flex items-start justify-between'>
												<Dialog.Title className='text-base font-semibold leading-6 text-gray-900'>
													Messages
												</Dialog.Title>
												<div className='ml-3 flex h-7 items-center'>
													<button
														type='button'
														className='relative rounded-md bg-white text-gray-400 hover:text-gray-500 focus:ring-2 focus:ring-indigo-500'
														onClick={() => setOpen(false)}
													>
														<span className='absolute -inset-2.5' />
														<span className='sr-only'>Close panel</span>
														<XMarkIcon className='h-6 w-6' aria-hidden='true' />
													</button>
												</div>
											</div>
										</div>
										<Search />

										<Chats open={open} setOpen={setOpen} />
									</div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</div>
			</Dialog>
		</Transition.Root>
	);
};

export default SideContact;
