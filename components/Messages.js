import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import styled from "styled-components";
import moment from "moment";
const Messages = ({ photoURL, timestamp, user, message }) => {
  const [userAuth] = useAuthState(auth);

  const MsgElement = userAuth.email == user ? Sender : Reciever;
  return (
    <Container>
      <MsgElement>
        <Msg>{message}</Msg>
        <Time>{timestamp && moment(timestamp).format("LT")}</Time>
      </MsgElement>
    </Container>
  );
};

export default Messages;

const Container = styled.div`
  padding: 0 10px;
`;
const MsgContainer = styled.p`
  object-fit: fit-content;
  padding: 6px;
  border-radius: 8px;
  max-width: 12rem;
  position: relative;
  text-align: right;
`;
const Msg = styled.p`
  font-size: 16px;
  margin-top: 0;
`;
const Sender = styled(MsgContainer)`
  margin-left: auto;
  background-color: #066;
  text-align: left;
`;
const Reciever = styled(MsgContainer)`
  background-color: #0e1519;
  text-align: left;
`;
const Time = styled.p`
  margin-bottom: 0;
  padding: 0;
  text-align: right;
  font-size: 12px;
`;
