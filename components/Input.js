import { IconButton } from "@material-ui/core";
import {
  AttachFileOutlined,
  EmojiEmotions,
  MicRounded,
  SendOutlined,
} from "@material-ui/icons";
import firebase from "firebase";
import { useRouter } from "next/router";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import styled from "styled-components";
import { auth, db } from "../firebase";
const Input = ({ endOfMessage }) => {
  const router = useRouter();
  const [user] = useAuthState(auth);
  const [msgInput, setMsgInput] = useState("");

  const sendMessageBtn = (e) => {
    e.preventDefault();
    //!add lastt seen
    db.collection("users").doc(user.uid).set(
      {
        lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
      },
      { merge: true }
    );
    db.collection("chats").doc(router.query.id).collection("messages").add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      user: user.email,
      photoURL: user.photoURL,
      message: msgInput,
    });
    endOfMessage();
    setMsgInput("");
  };
  return (
    <InputContainer>
      <IconButton>
        <EmojiEmotions style={{ color: "#eeee" }} />
      </IconButton>
      <IconButton>
        <AttachFileOutlined style={{ color: "#eeee" }} />
      </IconButton>
      <form onSubmit={(e) => sendMessageBtn(e)} type="submit">
        <InputTag
          value={msgInput}
          onChange={(e) => setMsgInput(e.target.value)}
          placeholder="type your massage"
        />
      </form>

      <IconButton>
        <MicRounded style={{ color: "#eeee" }} />
      </IconButton>
    </InputContainer>
  );
};

export default Input;

const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-space-evenly;
  align-items: center;
  width: 100%;
  position: sticky;
  bottom: 0;
  padding: 0.6rem;
  background-color: #2a3033;
  > form {
    width: 100%;
    display: flex;
  }
`;
const InputTag = styled.input`
  flex: 1;
  margin: 0 5px;
  background-color: #33393c;
  border-radius: 40px;
  border: none;
  outline: none;
  padding: 0.8rem 0.8rem;
  color: whitesmoke;
  font-size: 14px;
`;
