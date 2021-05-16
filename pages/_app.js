import "../styles/globals.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import Login from "./Login";
import Loading from "./Loading";
import firebase from "firebase";
import { useEffect } from "react";
function MyApp({ Component, pageProps }) {
  const [user, loading] = useAuthState(auth);
  console.log(process.env.NEXT_FIREBASE_APP_ID);

  useEffect(() => {
    if (user) {
      db.collection("users").doc(user?.uid).set(
        {
          email: user.email,
          lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
          photoUrl: user.photoURL,
        },
        { merg: true }
      );
    }
  }, [user]);

  if (!user) return <Login />;
  if (loading) return <Loading />;
  return <Component {...pageProps} />;
}

export default MyApp;
