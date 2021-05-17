import { Button } from "@material-ui/core";
import Image from "next/image";
import Head from "next/head";
import styled from "styled-components";
import { auth, provider } from "../firebase";

const Login = () => {
  const signIn = () => {
    auth.signInWithPopup(provider).catch((e) => alert(e.message));
  };
  return (
    <Container>
      <Head>
        <title>Login</title>
      </Head>
      <LoginContainer>
        <InnerContainer>
          <Logo src="https://us.123rf.com/450wm/ironsv/ironsv1906/ironsv190600136/124140056-telephone-icon-whatsapp-icon-vector-sign-symbol.jpg?ver=6" />
          <ButtonLogin onClick={signIn}>login with google</ButtonLogin>
        </InnerContainer>
      </LoginContainer>
    </Container>
  );
};
const Container = styled.div``;
const Logo = styled.img``;

const LoginContainer = styled.div`
  background-color: whitesmoke;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0rem;
  border-radius: 4px;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
    rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
    rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
`;
const ButtonLogin = styled(Button)`
  padding: 1rem 1rem !important;
  width: 100%;
  height: 100%;
  background-color: whitesmoke !important;
  font-size: 22px !important;
  font-weight: 600 !important;
  color: gray !important;
`;
export default Login;
