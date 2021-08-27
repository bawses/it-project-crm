import { useRouter } from "next/router";
import { getSession, signIn } from "next-auth/client";
import { useEffect, useState } from "react";
import styles from "../../styles/Home.module.css";

export default function SignUpPage() {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    getSession().then((session) => {
      if (session) {
        router.replace("/");
      } else {
        setIsLoading(false);
      }
    });
  }, [router]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <main className={styles.main}>
      <>
        <h1>You are not signed in</h1> <br />
        <input
          type="email"
          onChange={handleEmail}
          placeholder="example@email.com"
        />
        <input type="password" onChange={handlePassword} />
        <button onClick={handleSubmit}>Sign In</button>
      </>
    </main>
  );
}
