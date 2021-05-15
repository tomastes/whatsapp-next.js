import { useRouter } from "next/router";
import { useCollection } from "react-firebase-hooks/firestore";
import styled from "styled-components";
import { db } from "../firebase";
import Header from "./Header";
import Input from "./Input";
import Messages from "./Messages";

const Chatscreen = ({ chat, messages }) => {
  const router = useRouter();
  // console.log(JSON.parse(messages));
  const [messagesSnapshot, loading, error] = useCollection(
    db
      .collection("chats")
      .doc(router.query.id)
      .collection("messages")
      .orderBy("timestamp", "asc")
  );

  const renderMessages = () => {
    if (messagesSnapshot) {
      return messagesSnapshot.docs.map((msg) => (
        <Messages
          key={msg.id}
          photoURL={msg.data().photoURL}
          timestamp={msg.data().timestamp?.toDate().getTime()}
          user={msg.data().user}
          message={msg.data().message}
        />
      ));
    } else {
      return JSON.parse(messages).map((msg) => (
        <Messages
          key={msg.id}
          photoURL={msg.photoURL}
          timestamp={msg.timestamp}
          user={msg.user}
          message={msg.message}
        />
      ));
    }
  };
  return (
    <Container>
      {/* header */}
      <ChatHeader>
        <Header chat={chat} />
      </ChatHeader>
      {/* messages */}
      <ChatMsgsContainer>{renderMessages()}</ChatMsgsContainer>
      {/* input */}
      <InputContainer>
        <Input />
      </InputContainer>
    </Container>
  );
};

export default Chatscreen;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: space-between;
  height: 100vh;
  color: #e1e2e3;
`;
const ChatHeader = styled.div`
  width: 100%;
`;
const ChatMsgsContainer = styled.div`
  flex: 1;
  background-image: url("https://i.pinimg.com/originals/97/c0/07/97c00759d90d786d9b6096d274ad3e07.png");
`;
const InputContainer = styled.div``;
