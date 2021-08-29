import { useRouter } from "next/router";
import { getSession, signIn, signOut } from "next-auth/client";
import { useEffect, useState, MouseEvent } from "react";

export default function Profile() {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const handleSignOut = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
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
    <main>
      <>
        <h1>
          Welcome to your profile page! There is nothing currently here though...
        </h1>{" "}
        <button onClick={handleSignOut}>Sign Out</button>
        <br />
      </>
    </main>
  );
}
