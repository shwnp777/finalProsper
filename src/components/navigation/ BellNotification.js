import React, { useEffect, useState, useContext } from "react";
import {
  getFirestore,
  collection,
  query,
  onSnapshot,
  where,
} from "firebase/firestore";
import { BellIcon } from "@heroicons/react/24/outline";

const BellNotification = ({ currentUser }) => {
  const [hasNewChat, setHasNewChat] = useState(false);

  useEffect(() => {
    if (!currentUser) return; // Ensure the user is logged in

    const db = getFirestore();

    // Assuming you have a 'chats' collection and each chat document has a 'to' field for the receiver's UID and a 'read' field indicating if the chat has been read
    const chatQuery = query(
      collection(db, "chats"),
      where("to", "==", currentUser.uid),
      where("read", "==", false)
    );

    const unsubscribe = onSnapshot(chatQuery, (snapshot) => {
      if (snapshot.size > 0) {
        setHasNewChat(true);
      } else {
        setHasNewChat(false);
      }
    });

    // Cleanup the listener on component unmount
    return () => unsubscribe();
  }, [currentUser]);

  return (
    <div className="relative">
      <button
        type="button"
        className="relative ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
      >
        <span className="absolute -inset-1.5" />
        <span className="sr-only">View notifications</span>
        <BellIcon className="h-6 w-6" aria-hidden="true" />
      </button>
      {hasNewChat && (
        <span className="absolute top-1 right-2 block h-2 w-2 rounded-full bg-red-500"></span>
      )}
    </div>
  );
};

export default BellNotification;
