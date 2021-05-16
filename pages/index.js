import Head from "next/head";
import Chatscreen from "../components/Chatscreen";
import Sidebar from "../components/Sidebar";
import styles from "../styles/Home.module.css";

export default function Home() {
  console.log(process.env.NEXT_FIREBASE_APP_ID);

  return (
    <div>
      <Head>
        <title>whatsapp-nextjs</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Sidebar />
      {/* <Chatscreen chat={{}} messages={{}} /> */}
    </div>
  );
}
