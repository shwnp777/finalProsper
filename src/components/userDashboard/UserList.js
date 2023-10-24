import React, { useState, useEffect } from "react";
import { db } from "../../firebase-config"; // Adjust the path to your firebase config
import { collection, getDocs } from "firebase/firestore";
import FollowButton from "./FollowButton";

const UserList = ({ currentUser }) => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userCollection = collection(db, "users");
        const userSnapshot = await getDocs(userCollection);
        const userList = userSnapshot.docs.map((doc) => doc.data());
        setUsers(userList);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = users.filter(
    (user) =>
      user.firstName.toLowerCase().includes(filter.toLowerCase()) ||
      user.lastName.toLowerCase().includes(filter.toLowerCase()) ||
      user.business.toLowerCase().includes(filter.toLowerCase())
  ); // This filters the users based on the filter value

  return (
    <div>
      <h2>User List</h2>

      {/* Filter input */}
      <div>
        <div className="mt-2">
          <input
            type="text"
            id="filter"
            value={filter}
            onChange={(e) => setFilter(e.target.value)} // Update the filter value on input change
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="Filter by First or Last Name"
          />
        </div>
      </div>

      <div>
        <ul className="divide-y divide-gray-100">
          {filteredUsers.map((user) => (
            <li
              key={user.uid}
              className="flex flex-row w-96 items-center justify-around gap-x-6 py-5"
            >
              <div className="flex min-w-0 gap-x-4">
                <img
                  className="h-12 w-12 flex-none rounded-full bg-gray-50"
                  src={user.photoURL}
                  alt=""
                />
                <div className="min-w-0 flex-auto">
                  <p className="text-sm font-semibold leading-6 text-gray-900">
                    {user.firstName} {user.lastName}
                  </p>
                  <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                    {user.business === ""
                      ? "Waiting on Verification"
                      : user.business}
                  </p>
                </div>
              </div>
              <FollowButton
                userToFollowUID={user.uid}
                currentUser={currentUser}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserList;
