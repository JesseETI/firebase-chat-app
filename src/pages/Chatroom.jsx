//Material UI Exports
import Header from "../components/Header";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import {
  collection,
  query,
  orderBy,
  limitToLast,
  getFirestore,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import ChatMessage from "../components/Chatmessage";
import { useState, useRef, useEffect } from "react";

export default function Chatroom() {
  //get database object(1), collection(2), make query from collection(3)
  const firestore = getFirestore();
  const msgRef = collection(firestore, "messages");
  const q = query(msgRef, orderBy("createdAt"), limitToLast(25));

  //this hook stores the 25 last returned messages for mapping into ChatMessage components
  const [messages] = useCollectionData(q, { idField: "id" });
  console.log([messages]);

  const auth = getAuth();
  const dummy = useRef();

  useEffect(() => {
    dummy.current.scrollIntoView({ behavior: "smooth" }); //scroll to placeholder div whenever message is sent / render change
  });

  const [formValue, setFormValue] = useState("");
  const sendMessage = async (e) => {
    e.preventDefault();

    const { uid, photoURL } = auth.currentUser;

    // write single document with the document below
    await addDoc(msgRef, {
      text: formValue,
      createdAt: serverTimestamp(),
      uid,
      photoURL,
    });

    setFormValue("");
  };

  return (
    <Box className="chatroom" sx={{ height: "100vh" }}>
      {/*header */}
      <Header />

      {/*chat screen */}
      <Box
        className="messagesWrapper"
        sx={{
          px: 3,
          height: "75vh",
          overflow: "auto",
        }}
      >
        {messages &&
          messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}
        <div ref={dummy}></div>
      </Box>

      {/* message box */}
      <Box
        component="form"
        onSubmit={sendMessage}
        sx={{
          position: "sticky",
          bottom: 0,
          display: "flex",
          bgcolor: "primary.main",
          alignItems: "center",
          justifyContent: "center",
          p: 2,
          height: "15vh",
        }}
      >
        <Box
          className="formWrapper"
          sx={{
            width: "90%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TextField
            fullWidth
            required
            label="What's on your mind?"
            value={formValue}
            autoComplete="off"
            variant="filled"
            onChange={(e) => setFormValue(e.target.value)}
          />
          <Button
            type="submit"
            sx={{
              bgcolor: "primary.main",
              "&:active, :hover": { transform: "scale(1.5)" },
            }}
          >
            🔥
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
