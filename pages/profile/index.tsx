import { useRouter } from "next/router";
import { getSession, signIn, signOut } from "next-auth/client";
import { useEffect, useState } from "react";
import styles from "../../styles/Home.module.css";

export default function Profile() {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const handleSignOut = (e) => {
    signOut();
  };

  useEffect(() => {
    getSession().then((session) => {
      if (session) {
        setIsLoading(false);
      } else {
        router.replace("/login");
      }
    });
  }, [router]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <main className={styles.main}>
      <>
        <h1>
          Welcome to your profile page! There's nothing currently here though...
        </h1>{" "}
        <button onClick={handleSignOut}>Sign Out</button>
        <br />
      </>
    </main>
  );
}
