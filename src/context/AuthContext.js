import { createContext, useEffect, useState } from "react";
import { observeAuthChanges, getUserProfile } from "./firebaseFunctions";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = observeAuthChanges(
      async (user) => {
        if (user) {
          const userProfile = await getUserProfile(user.uid);
          setCurrentUser(userProfile);
        } else {
          setCurrentUser(null);
        }
        setLoading(false);
      },
      (error) => {
        console.error("Auth observer error:", error);
        setLoading(false);
      }
    );

    // Cleanup observer on unmount
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
