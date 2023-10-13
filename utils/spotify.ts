import SpotifyWebApi from "spotify-web-api-node";

const scopes = [
  "user-read-playback-state",
  "user-modify-playback-state",
  "user-read-currently-playing",
  "streaming",
  "playlist-read-private",
  "playlist-read-collaborative",
  "user-read-playback-position",
  "user-top-read",
  "user-read-recently-played",
  "user-library-read",
  "user-read-email",
].join(",");

const param = {
  scope: scopes,
};

const queryParamString = new URLSearchParams(param);

const AUTH_URL =
  "https://accounts.spotify.com/authorize?" + queryParamString.toString();

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
  clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
});

export default spotifyApi;
export { AUTH_URL };
