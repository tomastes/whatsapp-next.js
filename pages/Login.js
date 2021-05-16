import { Button } from "@material-ui/core";
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
        <Button onClick={signIn}>login with google</Button>
      </LoginContainer>
    </Container>
  );
};
const Container = styled.div``;
const LoginContainer = styled.div``;
export default Login;
