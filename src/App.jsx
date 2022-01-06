//pages
import ChatRoom from "./pages/Chatroom";
import SignIn from "./pages/SignIn";

//3rd Party Non-firestore
import useMediaQuery from "@mui/material/useMediaQuery";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import orange from "@mui/material/colors/orange";
import red from "@mui/material/colors/red";
import CssBaseline from "@mui/material/CssBaseline";
import { Routes, Route, Navigate } from "react-router-dom";
import { useMemo } from "react";

//firebase hook for user object
import { useAuthState } from "react-firebase-hooks/auth";

//firebase sdk
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

initializeApp({
  //my firebase config
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_MESSAGING_SENDER_ID,
});

function App() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme)");

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? "dark" : "light",
          primary: {
            main: orange[500],
            contrastText: "#fff",
          },
          secondary: {
            main: red[500],
            contrastText: "#fff",
          },
        },
      }),
    [prefersDarkMode]
  );

  {
    /* hook gets user from Firebase authentication object */
  }
  const auth = getAuth();
  const [user] = useAuthState(auth);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        <Route
          path="/"
          element={user ? <ChatRoom /> : <Navigate to="/signin" />}
        />
        <Route
          path="/signin"
          element={user ? <Navigate to="/" /> : <SignIn />}
        />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
