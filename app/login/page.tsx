"use client";

import { signIn } from "next-auth/react";

export default function Login() {
  return (
    <div>
      <button
        className="rounded-lg bg-blue-900"
        onClick={() => signIn("spotify", { callbackUrl: "/" })}
      >
        Log in with Spotify
      </button>
    </div>
  );
}
