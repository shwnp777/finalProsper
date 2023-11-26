import React, { useState, useEffect } from "react";
import axios from "axios";

const ProfileBox = ({ currentUser }) => { 

  return (
    <div>
      <div
        style={{
          width: "70px",
          height: "70px",
          overflow: "hidden",
          borderRadius: "50%",
        }}
      >
        <img
          style={{
            width: "80px",
          }}
          src={currentUser && currentUser.photoURL}
          alt=""
        />
      </div>
      <h1>{currentUser.firstName}'s Profile</h1>
    </div>
  );
};

export default ProfileBox;
