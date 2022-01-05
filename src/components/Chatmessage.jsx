import { getAuth } from "firebase/auth";

//Material UI exports
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";

// takes message prop from Chatroom (parent) and makes a Google account pfp with color-coded texts
const SentMessage = ({ message }) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        m: 2,
        gap: 2,
      }}
    >
      <Typography
        variant="h5"
        component="p"
        sx={{
          bgcolor: "primary.main",
          overflowWrap: "break-word",
          maxWidth: "50%",
          p: 2,
        }}
      >
        {message.text}
      </Typography>
      <Avatar src={message.photoURL} alt="" />
    </Box>
  );
};

const ReceivedMessage = ({ message }) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        m: 2,
        gap: 2,
      }}
    >
      <Avatar src={message.photoURL} alt="" />
      <Typography
        variant="h5"
        component="p"
        sx={{ bgcolor: "secondary.main", p: 2 }}
      >
        {message.text}
      </Typography>
    </Box>
  );
};

export default function Chatmessage({ message }) {
  const auth = getAuth();

  //logic to determine if new message prop was sent or received
  if (message.uid === auth.currentUser.uid) {
    return <SentMessage message={message} />;
  } else {
    return <ReceivedMessage message={message} />;
  }
}
