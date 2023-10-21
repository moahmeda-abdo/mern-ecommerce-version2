import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { Store } from "../pages/Store";

export default function AdminRoutes({ children }) {
  // Access the global state from the Store context
  const { state } = useContext(Store);
  const { userInfo } = state;

  // Check if userInfo contains user information, including roles
  // If userInfo is defined and the user has an admin or viewer role
  if (userInfo && (userInfo.isAdmin || userInfo.isViewer)) {
    // Render the child components or routes
    return children;
  } else {
    // Redirect the user to the "/signin" route if they lack the required roles
    return <Navigate to="/signin" />;
  }
}
