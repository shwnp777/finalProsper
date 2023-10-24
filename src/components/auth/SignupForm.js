import React, { useState, useEffect, Fragment } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import Add from "../../images/addAvatar.png";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db, storage, updateProfile } from "../../firebase-config";
import { getAllBusinesses } from "../../context/firebaseFunctions";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { login } from "../../features/userSlice";
import moment from "moment/moment";
import ErrorAuth from "./ErrorAuth";
import UserAndPassword from "./UserAndPassword";
import SingleInput from "./SingleInput";
import SearchBusiness from "./SearchBusiness";

const SignupForm = () => {
  const [err, setErr] = useState(false);
  const [errMessage, setErrMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [displayName, setDisplayName] = useState("DisplayName");
  const [email, setEmail] = useState("email");
  const [password, setPassword] = useState("password");
  const [image, setImage] = useState(null);
  const [files, setFiles] = useState(null);
  const [firstName, setFirstName] = useState("First");
  const [lastName, setLastName] = useState("Last");
  const [birthday, setBirthday] = useState("");
  const [businessZip, setBusinessZip] = useState(null);
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [businesses, setBusinesses] = useState([]);
  const [mobileNumber, setMobileNumber] = useState("555-555-5555");
  const [officeNumber, setOfficeNumber] = useState("801-555-5555");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const location = useLocation();

  console.log(location.pathname);

  useEffect(() => {
    const fetchBusinesses = async () => {
      const allBusinesses = await getAllBusinesses(db);
      setBusinesses(allBusinesses);
    };

    fetchBusinesses();
  }, []);

  const handleImage = (e) => {
    if (e.target.files[0]) {
      setFiles(URL.createObjectURL(e.target.files[0]));
      setImage(e.target.files[0]);
    }
    setImage(e.target.files[0]);
    console.log(image);
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    const res = await createUserWithEmailAndPassword(auth, email, password);
    const date = new Date().getTime();
    const imageRef = ref(storage, `images/${displayName + date}`);

    // Roles are as follows:
    // 1. Client
    // 2. Subscriber
    // 3. Account Manager
    // 4. Business Manager

    uploadBytes(imageRef, image)
      .then(() => {
        getDownloadURL(imageRef)
          .then(async (downloadURL, userAuth) => {
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              firstName,
              lastName,
              business: "",
              businessZip,
              verified: false,
              displayName,
              birthday: moment(birthday).format("YYYY-MM-DD"),
              mobileNumber,
              officeNumber,
              email,
              role: 1,
              photoURL: downloadURL,
              following: [],
              followers: [],
            });
            console.log({
              uid: res.user.uid,
              firstName,
              lastName,
              business: "",
              verified: false,
              businessZip,
              displayName,
              birthday: moment(birthday).format("YYYY-MM-DD"),
              mobileNumber,
              officeNumber,
              email,
              role: 1,
              photoURL: downloadURL,
              following: [],
              followers: [],
            });
            await setDoc(doc(db, "userChats", res.user.uid), {});
            await setDoc(doc(db, "points", res.user.uid), {});
            dispatch(
              login({
                email,
                uid: res.user.uid,
                displayName,
                photoUrl: downloadURL,
              })
            );
            await navigate("/user");
          })
          .catch((error) => {
            console.log(error.message, "Getting error uploading URL");
            setErr(true);
            setErrMessage(error.message);
            setLoading(false);
          });
      })
      .catch((error) => {
        console.log(error.message);
        setErr(true);
        setErrMessage(error.message);
        setLoading(false);
      });
  };

  return (
    <Fragment>
      {loading ? (
        "Loading..."
      ) : (
        <div className="authForm flex min-h-full flex-col justify-center sm:px-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <h2 className="mt-15 text-center text-3xl font-bold tracking-tight text-gray-600">
              Register a New Account
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Or{" "}
              <Link
                to="/auth"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                If you have already signed up, Login here.
              </Link>
            </p>
          </div>

          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
              <form className="space-y-6" onSubmit={handleSubmit}>
                {err && <ErrorAuth errMessage={errMessage} />}

                <div className="imageHandle">
                  <div className="imageUpload">
                    <input
                      name="file"
                      style={{ display: "none" }}
                      onChange={handleImage}
                      type="file"
                      id="file"
                    />
                    <label htmlFor="file">
                      <img src={Add} alt="" />
                      <span>Add avatar</span>
                    </label>
                    {/* <input type='file' onChange={handleImage} /> */}
                  </div>
                  <div className="imagePreview">
                    {files && <img src={files} alt="profile preview" />}
                  </div>
                </div>

                <UserAndPassword
                  setEmail={setEmail}
                  setPassword={setPassword}
                />
                <SingleInput
                  title="Display Name"
                  input={displayName}
                  setInput={setDisplayName}
                />
                <SingleInput
                  title="First Name"
                  input={firstName}
                  setInput={setFirstName}
                />
                <SingleInput
                  title="Last Name"
                  input={lastName}
                  setInput={setLastName}
                />
                <SingleInput
                  title="Business ZipCode"
                  input={businessZip}
                  setInput={setBusinessZip}
                />
                <SearchBusiness
                  selectedBusiness={selectedBusiness}
                  setSelectedBusiness={setSelectedBusiness}
                  businesses={businesses}
                  setBusinesses={setBusinesses}
                />
                <div>
                  <label
                    htmlFor="birthday"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Birthday
                  </label>
                  <div className="mt-1">
                    <input
                      id="birthday"
                      onChange={(e) => setBirthday(e.target.value)}
                      type="date"
                      autoComplete="birthday"
                      required
                      className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
                <SingleInput
                  title="Cell Phone"
                  input={mobileNumber}
                  setInput={setMobileNumber}
                />
                <SingleInput
                  title="Office Phone"
                  input={officeNumber}
                  setInput={setOfficeNumber}
                />

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <label
                      htmlFor="remember-me"
                      className="ml-2 block text-sm text-gray-900"
                    >
                      I have read the terms of service and agree
                    </label>
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Register
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default SignupForm;
