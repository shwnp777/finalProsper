import {
  doc,
  getDoc,
  getDocs,
  updateDoc,
  arrayUnion,
  arrayRemove,
  collection,
  query,
  where,
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { db } from "../firebase-config";
const auth = getAuth();

export const observeAuthChanges = (onUserChanged, onError) => {
  return onAuthStateChanged(auth, onUserChanged, onError);
};

export const getUserProfile = async (uid) => {
  const userDoc = await getDoc(doc(db, "users", uid));
  return userDoc.data();
};

// Get all businesses
export const getAllUsers = async (db) => {
  try {
    const querySnapshot = await getDocs(collection(db, "users"));
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching all users:", error.message);
    return [];
  }
};

// Get all businesses
export const getAllBusinesses = async (db) => {
  try {
    const querySnapshot = await getDocs(collection(db, "businesses"));
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching all businesses:", error.message);
    return [];
  }
};

// Get all businesses within a certain zipcode
export const getBusinessesByZip = async (db, zipCode) => {
  try {
    const q = query(
      collection(db, "businesses"),
      where("zipcode", "==", zipCode)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error(
      `Error fetching businesses with zip code ${zipCode}:`,
      error.message
    );
    return [];
  }
};

// Get business by business
export const getBusinessesByTag = async (db, businessTag) => {
  try {
    const q = query(
      collection(db, "businesses"),
      where("business", "==", businessTag)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error(
      `Error fetching businesses with business tag ${businessTag}:`,
      error.message
    );
    return [];
  }
};

// Add Employee function
export const addEmployee = async (businessID, userID) => {
  try {
    // First, check if the user with the given ID exists on the app
    const userDoc = await getDoc(doc(db, "profile", userID));

    if (!userDoc.exists()) {
      throw new Error("User does not exist on the app");
    }

    // Update the businessEmployees document to add the user's ID
    const businessEmployeesRef = doc(db, "businessEmployees", businessID);
    await updateDoc(businessEmployeesRef, {
      employees: arrayUnion(userID),
    });

    return true; // Successful addition
  } catch (error) {
    console.error("Error adding employee:", error);
    return false;
  }
};

// Delete Employee function
export const deleteEmployee = async (businessID, userID) => {
  try {
    // Update the businessEmployees document to remove the user's ID
    const businessEmployeesRef = doc(db, "businessEmployees", businessID);
    await updateDoc(businessEmployeesRef, {
      employees: arrayRemove(userID),
    });

    return true; // Successful deletion
  } catch (error) {
    console.error("Error deleting employee:", error);
    return false;
  }
};

export const addVerifyEmployee = async (businessID, userID) => {
  try {
    // First, check if the user with the given ID exists on the app
    const userDoc = await getDoc(doc(db, "profile", userID));

    if (!userDoc.exists()) {
      throw new Error("User does not exist on the app");
    }

    // Update the businessEmployees document to add the user's ID
    const businessVerifyEmployeesRef = doc(
      db,
      "businessVerifyEmployees",
      businessID
    );
    await updateDoc(businessVerifyEmployeesRef, {
      verifyEmployees: arrayUnion(userID),
    });

    return true; // Successful addition
  } catch (error) {
    console.error("Error adding Verified Employee:", error);
    return false;
  }
};

// Delete Employee function
export const deleteVerifyEmployee = async (businessID, userID) => {
  try {
    // Update the businessEmployees document to remove the user's ID
    const businessVerifyEmployeesRef = doc(
      db,
      "businessVerifyEmployees",
      businessID
    );
    await updateDoc(businessVerifyEmployeesRef, {
      verifyEmployees: arrayRemove(userID),
    });

    return true; // Successful deletion
  } catch (error) {
    console.error("Error deleting Verified Employee:", error);
    return false;
  }
};

export const getBusinessByID = async (businessID) => {
  try {
    const businessDoc = await getDoc(doc(db, "businesses", businessID));

    if (businessDoc.exists()) {
      return businessDoc.data();
    } else {
      console.log("No business found with this ID");
      return null;
    }
  } catch (error) {
    console.error("Error fetching business:", error.message);
    return null;
  }
};
