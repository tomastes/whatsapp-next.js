import { Avatar } from "@material-ui/core";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import styled from "styled-components";
import { auth, db } from "../firebase";
import { getChatRecipent } from "../utils/getChatRecipent";
import { useRouter as router, useRouter } from "next/router";
const Chat = ({ id, users }) => {
  const router = useRouter();
  const [user] = useAuthState(auth);
  const [recipientSnapshot] = useCollection(
    db.collection("users").where("email", "==", getChatRecipent(users, user))
  );

  const recipient = recipientSnapshot?.docs?.[0]?.data();

  const chatReciever = getChatRecipent(users, user);
  const interChat = () => {
    router.push(`/chat/${id}`);
  };
  return (
    <Container onClick={interChat}>
      {recipient ? (
        <UserAvatar src={user?.photoURL} />
      ) : (
        <UserAvatar>{chatReciever[0]}</UserAvatar>
      )}

      <p>{chatReciever}</p>
    </Container>
  );
};
const Container = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 15px;
  word-break: break-word;
  color: whitesmoke;
  border-bottom: 0.1px solid whitesmoke;

  :hover {
    background-color: #344;
  }
`;
const UserAvatar = styled(Avatar)`
  margin: 5px 15px 5px 5px;
`;
export default Chat;
