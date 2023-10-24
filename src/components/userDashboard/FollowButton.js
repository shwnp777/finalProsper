import React, { useState, useEffect } from "react";
import {
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";

import { db } from "../../firebase-config";
import { PlusIcon, MinusIcon } from "@heroicons/react/20/solid"; // Adjust the path to your firebase config

const FollowButton = ({ userToFollowUID, currentUser }) => {
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    // Fetch the current user's data on component mount and determine if they're following the user
    async function fetchFollowStatus() {
      const currentUID = currentUser.uid;
      const userDocRef = doc(db, "users", currentUID);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const { following } = userDoc.data();
        setIsFollowing(following.includes(userToFollowUID));
      }
    }

    fetchFollowStatus();
  }, [userToFollowUID]);

  const toggleFollow = async () => {
    const currentUID = currentUser.uid;
    const userDocRef = doc(db, "users", currentUID);

    // Toggle the follow status in the database
    if (isFollowing) {
      // If currently following, remove the userToFollowUID from the following array
      await updateDoc(userDocRef, {
        following: arrayRemove(userToFollowUID),
      });
    } else {
      // If not currently following, add the userToFollowUID to the following array
      await updateDoc(userDocRef, {
        following: arrayUnion(userToFollowUID),
      });
    }

    // Toggle the local state to reflect the new follow status
    setIsFollowing(!isFollowing);
  };

  return (
    <div>
      {isFollowing ? (
        <button
          type="button"
          className="rounded-full bg-indigo-600 p-1.5 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={toggleFollow}
        >
          <PlusIcon className="h-5 w-5" aria-hidden="true" />
        </button>
      ) : (
        <button
          type="button"
          className="rounded-full bg-pink-800 p-1.5 text-white shadow-sm hover:bg-pink-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pinbg-pink-800"
          onClick={toggleFollow}
        >
          <MinusIcon className="h-5 w-5" aria-hidden="true" />
        </button>
      )}
    </div>
  );
};

export default FollowButton;
