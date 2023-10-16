import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";
import spotifyApi from "../../utils/spotify";

// Singleton Object
export default function useSpotify() {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (session) {
      // If refresh access token attempt fails, redirect the user to the login page.
      if (session.error === "RefreshAccessTokenError") {
        signIn();
      }
      spotifyApi.setAccessToken(session.user.accessToken);
    }
  }, [session]);

  return spotifyApi;
}
