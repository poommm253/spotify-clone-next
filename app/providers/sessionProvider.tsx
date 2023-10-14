"use client";
import { SessionProvider } from "next-auth/react";
import { RecoilRoot } from "recoil";

interface NextAuthSessionProviderProps {
  children?: React.ReactNode;
}

export default function NextAuthSessionProvider({
  children,
}: NextAuthSessionProviderProps) {
  return (
    <SessionProvider>
      <RecoilRoot>{children}</RecoilRoot>
    </SessionProvider>
  );
}
