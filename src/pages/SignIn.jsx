import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

//Material UI exports
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import GoogleIcon from "@mui/icons-material/Google";
import { styled } from "@mui/system";
import Divider from "@mui/material/Divider";

//this wrapper is optimized for mobile-first design.
const Wrapper = styled("div")(({ theme }) => ({
  minHeight: "50vh",
  width: "100vw",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  textAlign: "center",
  padding: 20,
  [theme.breakpoints.up("md")]: {
    width: "50vw",
    height: "100vh",
  },
}));

export default function SignIn() {
  //this is only called if auth object in app (parent component) resulted in no user config.
  const auth = getAuth();

  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };
  return (
    <Grid container>
      <Grid item xs={12} md={6}>
        <Wrapper
          sx={{
            bgcolor: "primary.main",
            color: "primary.contrastText",
          }}
        >
          <Typography component="h1" variant="h4">
            🔥Firebase Chat App
          </Typography>
          <Divider
            variant="middle"
            sx={{
              borderBottomWidth: 5,
              borderStyle: "dotted",
              margin: 2,
              width: "30%",
            }}
          />
          <Typography variant="h6">
            A random meeting point on the internet 🌐
          </Typography>
        </Wrapper>
      </Grid>
      <Grid item xs={12} md={6}>
        <Wrapper sx={{ rowGap: 4 }}>
          <Typography variant="h4" textAlign="center">
            Rules
          </Typography>
          <Button
            sx={{ backgroundColor: "#FF0000" }}
            variant="contained"
            startIcon={<GoogleIcon />}
            onClick={signInWithGoogle}
          >
            Sign In With Gmail
          </Button>
          <Typography>
            Please be courteous as this chat is open to anyone who stumbles upon
            this link. <br />
            <br />
            Profane Language = LIFETIME BAN{" "}
            {/* This rule is implemented in cloud functions */}
          </Typography>
        </Wrapper>
      </Grid>
    </Grid>
  );
}
