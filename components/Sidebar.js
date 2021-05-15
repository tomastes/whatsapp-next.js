import { Avatar, Button, IconButton } from "@material-ui/core";
import {
  ChatOutlined,
  MoreVertRounded,
  SearchOutlined,
} from "@material-ui/icons";
import styled from "styled-components";
import * as EmailValidator from "email-validator";
import { auth, db } from "../firebase";
import Chat from "../components/Chat";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
const Sidebar = () => {
  const [user] = useAuthState(auth);
  const userChatRef = db
    .collection("chats")
    .where("users", "array-contains", user?.email);
  const [chatSnapshot] = useCollection(userChatRef);

  const createNewChat = () => {
    const input = prompt("inter email adress to chat with?");
    if (!input) return null;
    if (
      EmailValidator.validate(input) &&
      !chatAlradyExist(input) &&
      input !== user?.email
    ) {
      db.collection("chats").add({
        users: [user?.email, input],
      });
    }
  };

  const chatAlradyExist = (reciepentEmail) =>
    !!chatSnapshot?.docs.find(
      (chat) =>
        chat.data().users.find((user) => user === reciepentEmail)?.length > 0
    );

  const signOut = () => {
    auth.signOut();
  };
  return (
    <Container>
      {/* sideabr header */}
      <Header>
        <IconButton onClick={signOut}>
          <UserAvatar src={user?.photoURL && user?.photoURL} />
        </IconButton>
        <IconsContainer>
          <IconButton>
            <ChatOutlined style={{ color: "#eeee", marginLeft: "5px" }} />
          </IconButton>
          <IconButton>
            <MoreVertRounded style={{ color: "#eeee" }} />
          </IconButton>
        </IconsContainer>
      </Header>
      {/* sidebar search */}
      <Search>
        <SearchOutlined style={{ color: "#eeee" }} />
        <SearchInput style={{ color: "#eeee" }} placeholder="Search in chats" />
      </Search>
      <SidebarButton onClick={createNewChat}>start new chart</SidebarButton>
      {/* sidebar list of chats */}
      {chatSnapshot?.docs.map((chat) => (
        <Chat key={chat.id} id={chat.id} users={chat.data().users} />
      ))}
    </Container>
  );
};

const Container = styled.div`
  border-right: 1px solid gray;
  background-color: #122;
`;
const Header = styled.div`
  display: flex;
  position: sticky;
  align-items: center;
  justify-content: space-between;
  top: 0;
  padding: 15px;
  height: 80px;

  background-color: #2a3033;
  color: eee;

  z-index: 1;
`;
const UserAvatar = styled(Avatar)``;
const IconsContainer = styled.div``;
const Search = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  border-radius: 2px;
  flex: 1;
  margin: 2px 5px;
  background-color: #33393c;
  border-radius: 40px;
  border: none;
  outline: none;
  padding: 0.6rem 0.9rem;
`;
const SearchInput = styled.input`
  outline: none;
  border: none;
  flex: 1;
  background: none;
`;
const SidebarButton = styled(Button)`
  width: 100%;
  background-color: #33393c;
  color: whitesmoke;
  margin: 5px 0;
`;
export default Sidebar;
