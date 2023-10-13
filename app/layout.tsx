import "./globals.css";
import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import NextAuthSessionProvider from "./providers/sessionProvider";
import Sidebar from "@/components/Sidebar";

const font = Figtree({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Spotify Clone with Nextjs 13",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <NextAuthSessionProvider>
          <Sidebar>{children}</Sidebar>
        </NextAuthSessionProvider>
      </body>
    </html>
  );
}
