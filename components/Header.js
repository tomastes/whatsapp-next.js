import { Avatar, IconButton } from "@material-ui/core";
import { AttachFileOutlined, MoreVertRounded } from "@material-ui/icons";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import styled from "styled-components";
import { auth, db } from "../firebase";
import { getChatRecipent } from "../utils/getChatRecipent";
import TimeAgo from "timeago-react";
const Header = ({ chat }) => {
  const router = useRouter();
  const [user] = useAuthState(auth);
  const [reciepentSnapshot] = useCollection(
    db
      .collection("users")
      .where("email", "==", getChatRecipent(chat.users, user))
  );
  const reciepient = reciepentSnapshot?.docs?.[0]?.data();
  return (
    <Container>
      <HeaderLeft>
        <IconButton>
          <Avatar />
        </IconButton>
        <HeaderRec>
          <h3>{getChatRecipent(chat.users, user)}</h3>

          {reciepentSnapshot ? (
            <p>
              last active:{" "}
              {reciepient?.lastSeen?.toDate() ? (
                <TimeAgo datetime={reciepient?.lastSeen?.toDate()} />
              ) : (
                "unavailable"
              )}
            </p>
          ) : (
            <p>loading...</p>
          )}
        </HeaderRec>
      </HeaderLeft>
      <HeaderRight>
        <IconButton>
          <AttachFileOutlined style={{ color: "#eeee" }} />
        </IconButton>
        <IconButton>
          <MoreVertRounded style={{ color: "#eeee" }} />
        </IconButton>
      </HeaderRight>
    </Container>
  );
};

export default Header;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #2a3033;
`;
const HeaderLeft = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  margin: 0;
`;
const HeaderRec = styled.div`
  margin-left: 5px;
  > h3 {
    margin-bottom: 2px;
    font-weight: 500;
  }
  > p {
    margin-top: 0;
  }
`;
const HeaderRight = styled.div``;
