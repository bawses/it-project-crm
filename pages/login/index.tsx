import { useRouter } from "next/router";
import { getSession, signIn } from "next-auth/client";
import { useEffect, useState, ChangeEvent, MouseEvent } from "react";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    console.log(email);
  };

  const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    console.log(password);
  };

  const handleSubmit = async (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    
    e.preventDefault();

    const result = await signIn("credentials", {
      redirect: false,
      email: email,
      password: password,
    });
    // console.log(result);

    if (result?.error) {
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
    <main>
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
