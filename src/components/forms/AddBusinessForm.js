import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import moment from "moment";
import { doc, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "../../firebase-config";
import { v4 as uuid } from "uuid";

const AddBusinessForm = () => {
  const { currentUser } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [businessName, setBusinessName] = useState("");
  const [ein, setEin] = useState("");
  const [established, setEstablished] = useState(moment());
  const [streetOne, setStreetOne] = useState("");
  const [streetTwo, setStreetTwo] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [officeNumber, setOfficeNumber] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [owner, setOwner] = useState("");
  const [logo, setLogo] = useState(null);
  const [filer, setFiler] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser.business !== "") {
      navigate("/user");
    }
  }, [currentUser, navigate]);

  const handleLogo = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFiler(URL.createObjectURL(selectedFile));
      setLogo(selectedFile);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const date = new Date().getTime();
      const imageRef = ref(storage, `images/${businessName + date}`);
      await uploadBytes(imageRef, logo);

      const downloadURL = await getDownloadURL(imageRef);
      const businessID = businessName + uuid();

      await setDoc(doc(db, "businesses", businessID), {
        businessName,
        ein,
        businessVerified: false,
        streetOne,
        streetTwo,
        city,
        state,
        zipcode,
        officeNumber,
        email,
        website,
        owner,
        points: 0,
        dateEstablished: moment(established).format("YYYY-MM-DD"),
        photoURL: downloadURL,
      });
      await setDoc(doc(db, "businessEmployees", businessID), {
        employees: [],
      });
      await setDoc(doc(db, "businessVerifyEmployees", businessID), {
        verifyEmployees: [],
      });
      await setDoc(doc(db, "businessPoints", businessID), {});
      navigate(`/business/${businessID}/account`);
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center mt-10">
      <h2 className="text-2xl mb-6">Add Business</h2>
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      <form onSubmit={handleSubmit} className="w-full max-w-lg">
        {/* Logo */}
        <div className="mb-4">
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="logo"
          >
            Business Logo
          </label>
          <input
            className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            id="logo"
            type="file"
            onChange={handleLogo}
          />
          {filer && (
            <img src={filer} alt="Preview" className="mt-4 h-20 w-auto" />
          )}
        </div>
        {/* Business Name */}
        <div className="mb-4">
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="businessName"
          >
            Business Name
          </label>

          <input
            className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            id="businessName"
            type="text"
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            required
          />
        </div>

        {/* EIN */}
        <div className="mb-4">
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="ein"
          >
            EIN
          </label>
          <input
            className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            id="ein"
            type="text"
            value={ein}
            onChange={(e) => setEin(e.target.value)}
            required
          />
        </div>

        {/* Date Established */}
        <div className="mb-4">
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="established"
          >
            EIN
          </label>
          <input
            className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            id="established"
            type="date"
            value={established}
            onChange={(e) => setEstablished(e.target.value)}
            required
          />
        </div>

        {/* Street One */}
        <div className="mb-4">
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="streetOne"
          >
            Street Address 1
          </label>
          <input
            className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            id="streetOne"
            type="text"
            value={streetOne}
            onChange={(e) => setStreetOne(e.target.value)}
            required
          />
        </div>

        {/* Street Two */}
        <div className="mb-4">
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="streetTwo"
          >
            Street Address 2
          </label>
          <input
            className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            id="streetTwo"
            type="text"
            value={streetTwo}
            onChange={(e) => setStreetTwo(e.target.value)}
          />
        </div>

        {/* City */}
        <div className="mb-4">
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="city"
          >
            City
          </label>
          <input
            className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            id="city"
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </div>

        {/* State */}
        <div className="mb-4">
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="state"
          >
            State
          </label>
          <input
            className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            id="state"
            type="text"
            value={state}
            onChange={(e) => setState(e.target.value)}
            required
          />
        </div>

        {/* Zipcode */}
        <div className="mb-4">
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="zipcode"
          >
            Zipcode
          </label>
          <input
            className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            id="zipcode"
            type="text"
            value={zipcode}
            onChange={(e) => setZipcode(e.target.value)}
            required
          />
        </div>

        {/* Office Number */}
        <div className="mb-4">
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="officeNumber"
          >
            Office Number
          </label>
          <input
            className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            id="officeNumber"
            type="tel"
            value={officeNumber}
            onChange={(e) => setOfficeNumber(e.target.value)}
            required
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* Website */}
        <div className="mb-4">
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="website"
          >
            Website
          </label>
          <input
            className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            id="website"
            type="url"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
        </div>

        {/* Owner */}
        <div className="mb-4">
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="owner"
          >
            Owner
          </label>
          <input
            className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            id="owner"
            type="text"
            value={owner}
            onChange={(e) => setOwner(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          {loading ? "Adding..." : "Add Business"}
        </button>
      </form>
    </div>
  );
};

export default AddBusinessForm;
