import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebaseConfig";
import { CircularProgress, Box } from "@mui/material";

function ProtectedRoute({ children }) {
  const [user, loading] = useAuthState(auth);

  if (loading)
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );

  if (!user) return <Navigate to="/login" replace />;
  return children;
}

export default ProtectedRoute;