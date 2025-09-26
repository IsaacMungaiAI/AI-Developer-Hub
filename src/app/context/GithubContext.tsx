// context/GithubContext.tsx
"use client";
import { createContext, useContext, useState } from "react";

interface GithubContextType {
  username: string;
  setUsername: (username: string) => void;
}

const GithubContext = createContext<GithubContextType | undefined>(undefined);

export const GithubProvider = ({ children }: { children: React.ReactNode }) => {
  const [username, setUsername] = useState("");

  return (
    <GithubContext.Provider value={{ username, setUsername }}>
      {children}
    </GithubContext.Provider>
  );
};

export const useGithub = () => {
  const ctx = useContext(GithubContext);
  if (!ctx) throw new Error("useGithub must be used inside GithubProvider");
  return ctx;
};
