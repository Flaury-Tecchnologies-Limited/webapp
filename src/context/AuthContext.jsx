import { createContext, useContext, useEffect, useState } from "react";
import userAPI from "@/api/user/user";
import PropTypes from "prop-types";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

const AuthContextProvider = ({ children }) => {
  // user starts null, not empty string
  const [user, setUser] = useState(null);
  // allUser should be array, not string
  const [allUser, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // loading spinner for fetch

  // fetch user only if token exists
  const fetchUserDetails = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      // If there's no token, don't overwrite a hydrated user (dev/local-stored)
      // just stop the fetch and clear the loading flag. This avoids wiping
      // a user that was set manually in localStorage for development.
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch(userAPI.userAPI.getLoggedUser(), {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`, // only send valid token
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) throw new Error(`Server responded ${res.status}`);

      const json = await res.json();

      if (!json?.data?.user) throw new Error("Malformed response");

      setUser(json.data.user);
      // Persist user in multiple common keys for backward compatibility across the app
      try {
        localStorage.setItem("FLYuserData", JSON.stringify(json.data.user));
        localStorage.setItem("userInfo", JSON.stringify(json.data.user));
        // some components expect `userData` or `roleData` as separate values
        localStorage.setItem("userData", JSON.stringify(json.data.user));
        localStorage.setItem("roleData", json.data.user.role || "");
      } catch (e) {
        // ignore if localStorage is unavailable
      }
    } catch (err) {
      console.log("Error fetching user details:", err);
      setUser(null);
      try {
        localStorage.removeItem("FLYuserData"); // clear invalid data
        localStorage.removeItem("userInfo");
        localStorage.removeItem("userData");
        localStorage.removeItem("roleData");
      } catch (e) {}
    } finally {
      setIsLoading(false);
    }
  };

  // fetch all users, cleaned variable name
  const fetchAllUsers = async () => {
    try {
      const result = await userAPI.userAPI.getAllUsers();
      if (result.success) setAllUsers(result.data.users);
      else console.log("Failed to fetch all users:", result.error);
    } catch (err) {
      console.error("Error fetching all users:", err);
    }
  };

  // listen to storage changes, only refetch if token exists
  useEffect(() => {
    fetchUserDetails();

    const handleStorageChange = (event) => {
      // If user data or token changed in another tab, refresh the user
      if (
        (event.key === "FLYuserData" || event.key === "userInfo" || event.key === "accessToken") &&
        localStorage.getItem("accessToken")
      ) {
        fetchUserDetails();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // load user from storage on mount
  useEffect(() => {
    // Try to hydrate user from any known storage key for faster UI render
    const storedUser =
      localStorage.getItem("FLYuserData") || localStorage.getItem("userInfo") || localStorage.getItem("userData");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        // If storedUser is a string role or malformed, ignore
      }
    }
    setIsLoading(false);
  }, []);

  // logout clears everything and resets states
  const logOut = () => {
    try {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("FLYuserData");
      localStorage.removeItem("userInfo");
      localStorage.removeItem("userData");
      localStorage.removeItem("roleData");
    } catch (e) {}
    setUser(null);
    setIsLoading(false);
    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role: user?.role || null,
        allUser,
        loading,
        isLoading,
        setLoading,
        fetchUserDetails,
        fetchAllUsers,
        logOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

AuthContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
