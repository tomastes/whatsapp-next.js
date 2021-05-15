import firebase from "firebase";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyARH6PAfcxzC3oDwyy5K7kMQ5CJ3KHjEfw",
  authDomain: "whatsapp-2-fe29b.firebaseapp.com",
  projectId: "whatsapp-2-fe29b",
  storageBucket: "whatsapp-2-fe29b.appspot.com",
  messagingSenderId: "772931611501",
  appId: "1:772931611501:web:f0e91e73fd8ae2595ec864",
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();
const db = app.firestore();
const auth = app.auth();
const provider = new firebase.auth.GoogleAuthProvider();
export { db, auth, provider };
