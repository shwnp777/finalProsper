import { Fragment, useContext, useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase-config";
import { AuthContext } from "../../context/AuthContext";
import Logo from "../../images/mainLogo.png";
import Time from "../../images/loading.png";
import BellNotification from "./ BellNotification";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function UserNavigation() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const location = useLocation();
  const { pathname } = location;
  const splitLocation = pathname.split("/");
  // const photoUrl = currentUser.photoURL

  useEffect(() => {
    if (!currentUser) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [currentUser]);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log("signed out");
        navigate("/auth");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) =>
        loading ? (
          "Loading..."
        ) : (
          <>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex h-16 items-center justify-between">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <img className="h-8 w-auto" src={Logo} alt="Your Company" />
                  </div>
                  <div className="hidden sm:ml-6 sm:block">
                    <div className="flex space-x-4">
                      {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
                      <Link
                        to="/user/"
                        className={
                          splitLocation[2] === ""
                            ? "rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white"
                            : "rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                        }
                      >
                        Dashboard
                      </Link>
                      <Link
                        to="/user/messages"
                        className={
                          splitLocation[2] === "messages"
                            ? "rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white"
                            : "rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                        }
                      >
                        Messages
                      </Link>
                      <Link
                        to="/user/points"
                        className={
                          splitLocation[2] === "points"
                            ? "rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white"
                            : "rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                        }
                      >
                        Points
                      </Link>
                      <Link
                        to="/user/contacts"
                        className={
                          splitLocation[2] === "contacts"
                            ? "rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white"
                            : "rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                        }
                      >
                        Contacts
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex items-center">
                    <BellNotification currentUser={currentUser} />

                    {/* Profile dropdown */}
                    <Menu as="div" className="relative ml-3">
                      <div>
                        <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                          <span className="absolute -inset-1.5" />
                          <span className="sr-only">Open user menu</span>
                          <img
                            className="h-8 w-8 rounded-full"
                            src={loading ? Time : currentUser.photoURL}
                            alt=""
                          />
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                href="#"
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}
                              >
                                Your Profile
                              </Link>
                            )}
                          </Menu.Item>
                          {currentUser.role === 3 ? (
                            <Menu.Item>
                              {({ active }) => (
                                <Link
                                  href="#"
                                  className={classNames(
                                    active ? "bg-gray-100" : "",
                                    "block px-4 py-2 text-sm text-gray-700"
                                  )}
                                >
                                  Settings
                                </Link>
                              )}
                            </Menu.Item>
                          ) : (
                            ""
                          )}
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                onClick={() => handleLogout()}
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}
                              >
                                Sign out
                              </Link>
                            )}
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                </div>
                <div className="-mr-2 flex sm:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              <div className="space-y-1 px-2 pb-3 pt-2">
                {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
                <Link
                  to="/user/"
                  className={
                    splitLocation[2] === ""
                      ? "block rounded-md bg-gray-900 px-3 py-2 text-base font-medium text-white"
                      : "block rounded-md bg-gray-700 px-3 py-2 text-base font-medium text-white"
                  }
                >
                  Dashboard
                </Link>
                <Link
                  to="/user/messages"
                  className={
                    splitLocation[2] === "messages"
                      ? "block rounded-md bg-gray-900 px-3 py-2 text-base font-medium text-white"
                      : "block rounded-md bg-gray-700 px-3 py-2 text-base font-medium text-white"
                  }
                >
                  Messages
                </Link>
                <Link
                  to="/user/points"
                  className={
                    splitLocation[2] === "points"
                      ? "block rounded-md bg-gray-900 px-3 py-2 text-base font-medium text-white"
                      : "block rounded-md bg-gray-700 px-3 py-2 text-base font-medium text-white"
                  }
                >
                  Points
                </Link>
                <Link
                  to="/user/contacts"
                  className={
                    splitLocation[2] === "contacts"
                      ? "block rounded-md bg-gray-900 px-3 py-2 text-base font-medium text-white"
                      : "block rounded-md bg-gray-700 px-3 py-2 text-base font-medium text-white"
                  }
                >
                  Contacts
                </Link>
              </div>
              <div className="border-t border-gray-700 pb-3 pt-4">
                <div className="flex items-center px-5">
                  <div className="flex-shrink-0">
                    <img
                      className="h-10 w-10 rounded-full"
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt=""
                    />
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium text-white">
                      Tom Cook
                    </div>
                    <div className="text-sm font-medium text-gray-400">
                      tom@example.com
                    </div>
                  </div>
                </div>
                <div className="mt-3 space-y-1 px-2">
                  <Disclosure.Button
                    as="a"
                    href="#"
                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                  >
                    Your Profile
                  </Disclosure.Button>
                  <Disclosure.Button
                    as="a"
                    href="#"
                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                  >
                    Settings
                  </Disclosure.Button>
                  <Disclosure.Button
                    as="a"
                    onClick={() => handleLogout()}
                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                  >
                    Sign out
                  </Disclosure.Button>
                </div>
              </div>
            </Disclosure.Panel>
          </>
        )
      }
    </Disclosure>
  );
}
