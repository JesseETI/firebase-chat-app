import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { getAuth, signOut } from "firebase/auth";

export default function Header() {
  const auth = getAuth();
  const signOutOfGoogle = () => {
    signOut(auth);
  };

  return (
    <Box
      sx={{
        position: "sticky",
        top: 0,
        zIndex: 2,
        height: "10vh",
      }}
    >
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Chat Room
          </Typography>
          <Button color="inherit" onClick={signOutOfGoogle}>
            Sign Out
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
