"use client";

import Image from "next/image";
import { useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { useGithub } from "@/app/context/GithubContext";

export default function Home() {
  const { data: session, status } = useSession();
  const { username, setUsername } = useGithub();

  useEffect(() => {
    if (session?.user?.login) {
      setUsername(session.user.login); // sync github username into context
    }
  }, [session, setUsername]);

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1 className="text-4xl font-bold">AI Developer Hub</h1>

        {/* Show session state */}
        {status === "loading" && <p>Loading...</p>}

        {status === "unauthenticated" && (
          <>
            <p className="text-gray-600">Not signed in</p>
            <button
              onClick={() => signIn("github")}
              className="px-4 py-2 bg-black text-white rounded-lg"
            >
              Sign in with GitHub
            </button>
          </>
        )}

        {session && (
          <>
            <p className="text-gray-600">
              Signed in as <span className="font-semibold">{username}</span>
            </p>
            <button
              onClick={() => signOut()}
              className="px-4 py-2 bg-red-500 text-white rounded-lg"
            >
              Sign out
            </button>
          </>
        )}
      </main>

      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image aria-hidden src="/file.svg" alt="File icon" width={16} height={16} />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image aria-hidden src="/window.svg" alt="Window icon" width={16} height={16} />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image aria-hidden src="/globe.svg" alt="Globe icon" width={16} height={16} />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}

