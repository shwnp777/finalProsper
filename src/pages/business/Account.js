import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBusinessByID } from "../../context/firebaseFunctions";
import VerifiedAccount from "../../components/business/VerifiedAccount";
import NotVerified from "../../components/business/NotVerified";

const Account = () => {
  const [businessInfo, setBusinessInfo] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [alertBool, setAlertBool] = useState(false);
  let { id } = useParams();

  useEffect(() => {
    const getBizData = async () => {
      const businessData = await getBusinessByID(id);

      if (businessData) {
        setBusinessInfo(businessData);
      } else {
        setErrorMessage("Business not found");
        setAlertBool(true);
      }
    };

    getBizData();
  }, [id]);

  console.log(businessInfo);

  return (
    <div>
      <h1>Account</h1>
      {errorMessage && alertBool && (
        <div>
          <p>{errorMessage}</p>
        </div>
      )}
      {businessInfo === null ? (
        "No business exists for this ID!"
      ) : businessInfo.businessVerified === true ? (
        <VerifiedAccount businessInfo={businessInfo} />
      ) : businessInfo.businessVerified === false ? (
        <NotVerified businessInfo={businessInfo} />
      ) : (
        "No business exists by this ID"
      )}
    </div>
  );
};

export default Account;
