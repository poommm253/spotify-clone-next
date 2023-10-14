"use client";

import Header from "@/app/(site)/components/Header";
import Featured from "./components/Featured";
import RecentlyPlayed from "./components/RecentlyPlayed";
import { useRecoilState, useRecoilValue } from "recoil";
import { playlistIdState, playlistState } from "@/atoms/playlistAtom";
import { useEffect } from "react";
import useSpotify from "../hooks/useSpotify";
import Link from "next/link";

export default function Home() {
  const selectedPlaylistId = useRecoilValue(playlistIdState);
  const api = useSpotify();

  const [playlist, setPlaylist] = useRecoilState(playlistState);

  useEffect(() => {
    console.log(selectedPlaylistId);

    if (selectedPlaylistId) {
      console.log("fetching tracks");
      console.log(selectedPlaylistId);
      api.getAccessToken();
      api
        .getPlaylist(selectedPlaylistId)
        .then((data) => {
          setPlaylist(data.body);
        })
        .catch((err) => console.log(err));
    }
  }, [api, selectedPlaylistId]);

  if (!selectedPlaylistId) {
    return (
      <div className="bg-gradient-to-b from-emerald-800 h-1/2">
        <Header />
        <Featured />
        <h2 className="py-5 mx-8 text-3xl font-bold">Good Evening</h2>
        <RecentlyPlayed />
        <h2 className="pt-10 pb-5 mx-8 text-3xl font-bold">Made For You</h2>
      </div>
    );
  } else {
    if (playlist) {
      console.log(playlist);
      return (
        <div className="bg-gradient-to-b from-purple-800 h-1/2">
          <Header />
          <div className="flex flex-row items-center space-x-5 p-5">
            <img
              className="h-32 w-32 md:h-48 md:w-48 rounded-md"
              src={playlist.images[0].url}
            ></img>
            <div className="flex flex-col space-y-2">
              <p className="text-sm">{playlist.type}</p>
              <h1 className="text-[4vw] font-bold lg:text-7xl">
                {playlist.name}
              </h1>
              <p className="opacity-50 text-sm">{playlist.description}</p>
              <div className="flex flex-row items-center space-x-1">
                <div className="h-5 w-5 rounded-full bg-black"></div>
                <Link href={playlist.owner.href}>
                  {playlist.owner.display_name}
                </Link>
                <p>• {playlist.followers.total} likes •</p>
                <p>{playlist.tracks.total} songs</p>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}