import styled from "styled-components";
import Head from "next/head";
import Sidebar from "../../components/Sidebar";
import Chatscreen from "../../components/Chatscreen";
import { auth, db } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { getChatRecipent } from "../../utils/getChatRecipent";
const Chat = ({ chat, messages }) => {
  const [user] = useAuthState(auth);
  return (
    <Container>
      <Head>
        <title>{`Chat with ${getChatRecipent(chat.users, user)} `}</title>
      </Head>
      <Sidebar />
      <ChatContainer>
        <Chatscreen chat={chat} messages={messages} />
      </ChatContainer>
    </Container>
  );
};

export default Chat;

export async function getServerSideProps(context) {
  const ref = db.collection("chats").doc(context.params.id);
  //prepare the messages on server
  const messagesRes = await ref
    .collection("messages")
    .orderBy("timestamp", "asc")
    .get();
  //on snapshot
  const messages = messagesRes.docs
    .map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    .map((messages) => ({
      ...messages,
      timestamp: messages.timestamp.toDate().getTime(),
    }));
  //prepare the chat on server
  const chatRes = await ref.get();
  const chat = {
    id: chatRes.id,
    ...chatRes.data(),
  };

  return { props: { chat, messages: JSON.stringify(messages) } };
}

const Container = styled.div`
  display: flex;
`;
const ChatContainer = styled.div`
  width: 100%;
`;
