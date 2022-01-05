//Material UI Exports
import Header from "../components/Header";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import {
  collection,
  query,
  orderBy,
  limit,
  getFirestore,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import ChatMessage from "../components/Chatmessage";
import { useState, useRef } from "react";

export default function Chatroom() {
  //get database object(1), collection(2), make query from collection(3)
  const firestore = getFirestore();
  const msgRef = collection(firestore, "messages");
  const q = query(msgRef, orderBy("createdAt"), limit(25));

  //this hook stores the 25 last returned messages for mapping into ChatMessage components
  const [messages] = useCollectionData(q, { idField: "id" });

  const auth = getAuth();
  const dummy = useRef();
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

    dummy.current.scrollIntoView({ behavior: "smooth" }); //scroll to placeholder div whenever message is sent
  };

  return (
    <Box className="chatroom">
      {/*header */}
      <Header />

      {/*chat screen */}
      <Box className="messagesWrapper" sx={{ px: 3, pt: 8, overflow: "auto" }}>
        {messages &&
          messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}
      </Box>

      {/* message box */}
      <Box
        component="form"
        onSubmit={sendMessage}
        sx={{
          position: "fixed",
          bottom: 0,
          width: "100%",
          display: "flex",
          bgcolor: "primary.main",
          p: 2,
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
            "&:hover": { bgcolor: "primary.contrastText" },
          }}
        >
          🔥
        </Button>
      </Box>
      <div ref={dummy}></div>
    </Box>
  );
}
