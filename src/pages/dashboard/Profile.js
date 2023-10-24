import React, { useEffect, useState, useContext, Fragment } from "react";
import { AuthContext } from "../../context/AuthContext";
import AddBusinessButton from "../../components/userDashboard/AddBusinessButton";
import ProfileBox from "../../components/userDashboard/ProfileBox";
import UserList from "../../components/userDashboard/UserList";

const Profile = () => {
  const [loading, setLoading] = useState(true);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    if (!currentUser) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [currentUser]);

  console.log(currentUser);

  return (
    <Fragment>
      {loading ? (
        "Loading..."
      ) : (
        <div>
          <ProfileBox currentUser={currentUser} />
          {currentUser.business === "" ? <AddBusinessButton /> : ""}
        </div>
      )}
    </Fragment>
  );
};

export default Profile;
