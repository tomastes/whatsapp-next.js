import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import styled from "styled-components";
const Messages = ({ photoURL, timestamp, user, message }) => {
  const [userAuth] = useAuthState(auth);

  const MsgElement = userAuth.email == user ? Sender : Reciever;
  return (
    <Container>
      <MsgElement>{message}</MsgElement>
    </Container>
  );
};

export default Messages;

const Container = styled.div`
  padding: 0 10px;
`;
const MsgContainer = styled.p`
  object-fit: fit-content;
  padding: 15px;
  border-radius: 8px;
  max-width: 10rem;
  padding-bottom: 26px;
  position: relative;
  text-align: right;
`;

const Sender = styled(MsgContainer)`
  margin-left: auto;
  background-color: #066;
`;
const Reciever = styled(MsgContainer)`
  background-color: #0e1519;
  text-align: left;
`;
