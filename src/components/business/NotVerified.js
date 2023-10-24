import React from "react";

const NotVerified = ({ businessInfo }) => {
  return (
    <div>
      <h1>{businessInfo.businessName} has not been verified</h1>
    </div>
  );
};

export default NotVerified;
