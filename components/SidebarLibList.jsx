"use client";

import { useEffect, useState } from "react";
import useSpotify from "../app/hooks/useSpotify";
import { useSession } from "next-auth/react";
import { allPlaylistState, playlistIdState } from "@/atoms/playlistAtom";
import { useRecoilState } from "recoil";

// async function fetchUserPlaylist(userId, accessToken) {
//   const response = await fetch(
//     `https://api.spotify.com/v1/users/${userId}/playlists`,
//     {
//       method: "GET",
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//       },
//     }
//   );

//   console.log(userId);
//   console.log(response);
// }

const SidebarLib = () => {
  const api = useSpotify();
  const { data: session } = useSession();
  const [playlists, setPlaylists] = useRecoilState(allPlaylistState);
  const [selectedPlaylistId, setSelectedPlaylistId] =
    useRecoilState(playlistIdState);

  useEffect(() => {
    if (api.getAccessToken()) {
      api.getUserPlaylists().then((data) => setPlaylists(data.body.items));
    }

    console.log(playlists);
  }, [session, api]);

  return (
    <div className="space-y-3 h-min md:p-5">
      {playlists?.map((item) => {
        return (
          <button
            key={item.name}
            onClick={() => setSelectedPlaylistId(item.id)}
            className="flex flex-row justify-center md:justify-normal items-center md:space-x-3"
          >
            <img
              className="h-12 w-12 rounded-md"
              src={item.images[0].url}
              alt="Playlist image"
            ></img>
            <div className="flex flex-col">
              <p className="hidden md:flex font-bold text-ellipsis">
                {item.name}
              </p>
              <p className="hidden md:flex text-neutral-400 max-w-xs">
                {item.type} • {item.owner.display_name}
              </p>
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default SidebarLib;
