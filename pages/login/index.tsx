import { useRouter } from "next/router";
import { getSession, signIn } from "next-auth/client";
import { useEffect, useState } from "react";
import styles from "../../styles/Home.module.css";
import axios, { AxiosResponse } from "axios";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmail = (e) => {
    setEmail(e.target.value);
    console.log(email);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
    console.log(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await signIn("credentials", {
      redirect: false,
      email: email,
      password: password,
    });

    if (result.error) {
      console.log("Invalid User Credentials Entered");
      console.log(result.error);
    } else {
      router.replace("/profile");
    }
  };

  useEffect(() => {
    getSession().then((session) => {
      if (session) {
        router.replace("/profile");
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
