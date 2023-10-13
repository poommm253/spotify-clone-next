"use client";

import { useEffect, useState } from "react";
import useSpotify from "../app/hooks/useSpotify";
import { useSession } from "next-auth/react";

async function fetchUserPlaylist(userId, accessToken) {
  const response = await fetch(
    `https://api.spotify.com/v1/users/${userId}/playlists`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  console.log(userId);
  console.log(response);
}

const SidebarLib = () => {
  const api = useSpotify();
  const { data: session } = useSession();
  var [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    if (api.getAccessToken()) {
      api.getUserPlaylists().then((data) => setPlaylists(data.body.items));
    }

    console.log(playlists);
  }, [session, api]);

  return (
    <div className="space-y-3 h-min md:p-5">
      {playlists.map((item) => {
        return (
          <div className="flex flex-row justify-center md:justify-normal items-center md:space-x-3">
            <img
              className="h-12 w-12 rounded-md"
              src={item.images[0].url}
              alt="Playlist image"
            ></img>
            <p className="hidden md:flex">{item.name}</p>
          </div>
        );
      })}
    </div>
  );
};

export default SidebarLib;
