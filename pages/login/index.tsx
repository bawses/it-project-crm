import Head from "next/head";
import styles from "../styles/Home.module.css";
import React from "react";
import { signIn, signOut, useSession } from "next-auth/client";

const home = () => {
  const [session, loading] = useSession();

  return (
    <div className={styles.container}>
      <Head>
        <title>Jobs App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        {!session && (
          <>
            <h1>You are not signed in</h1> <br />
            <button onClick={signIn}>Sign in</button>
          </>
        )}

        {session && (
          <>
            <h1>Signed in as {session.user.name} </h1> <br />
            <button onClick={signOut}>Sign out</button>
          </>
        )}
      </main>

      <footer className={styles.footer}>Powered by Pragmatic Reviews</footer>
    </div>
  );
};

export default home;
