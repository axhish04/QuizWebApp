import React, { useState } from "react";
import { signInWithGoogle, signInWithEmail, signUpWithEmail } from "../firebase/firebaseUtils";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebaseConfig";
import { useNavigate, Navigate } from "react-router-dom";
import { Button, TextField, Typography, Box, Paper, Divider } from "@mui/material";
import { Google } from "@mui/icons-material";
import { motion } from "framer-motion";

function LoginPage() {
  const [user] = useAuthState(auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  if (user) return <Navigate to="/" />;

  const handleGoogle = async () => {
    try {
      await signInWithGoogle();
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEmailAuth = async (e) => {
    e.preventDefault();
    setError("");
    try {
      if (isSignup) {
        await signUpWithEmail(email, password);
      } else {
        await signInWithEmail(email, password);
      }
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <Box maxWidth={400} mx="auto" mt={6}>
        <Paper sx={{ p: 4 }}>
          <Typography variant="h5" gutterBottom>
            {isSignup ? "Sign Up" : "Login"}
          </Typography>
          <Button
            variant="outlined"
            startIcon={<Google />}
            fullWidth
            sx={{ mb: 2 }}
            onClick={handleGoogle}
          >
            Sign in with Google
          </Button>
          <Divider sx={{ my: 2 }}>or</Divider>
          <form onSubmit={handleEmailAuth}>
            <TextField
              label="Email"
              type="email"
              fullWidth
              required
              sx={{ mb: 2 }}
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <TextField
              label="Password"
              type="password"
              fullWidth
              required
              sx={{ mb: 2 }}
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            {error && (
              <Typography color="error" sx={{ mb: 2 }}>
                {error}
              </Typography>
            )}
            <Button type="submit" variant="contained" fullWidth>
              {isSignup ? "Sign Up" : "Login"}
            </Button>
          </form>
          <Button
            color="secondary"
            sx={{ mt: 2 }}
            onClick={() => setIsSignup(!isSignup)}
          >
            {isSignup ? "Already have an account? Login" : "No account? Sign Up"}
          </Button>
        </Paper>
      </Box>
    </motion.div>
  );
}

export default LoginPage;