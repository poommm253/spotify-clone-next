"use client";

import Header from "@/app/(site)/components/Header";
import Featured from "./components/Featured";
import RecentlyPlayed from "./components/RecentlyPlayed";
import { useRecoilState, useRecoilValue } from "recoil";
import { playlistIdState, playlistState } from "@/atoms/playlistAtom";
import { useEffect, useState } from "react";
import useSpotify from "../hooks/useSpotify";
import Link from "next/link";
import FeaturedPlaylist from "./components/FeaturedPlaylist";
import TopTracks from "./components/TopTracks";

export default function Home() {
  const selectedPlaylistId = useRecoilValue(playlistIdState);
  const api = useSpotify();
  const [isLoading, setIsLoading] = useState(false);
  const [playlist, setPlaylist] = useRecoilState(playlistState);

  useEffect(() => {
    console.log(selectedPlaylistId);

    if (selectedPlaylistId) {
      console.log("fetching tracks");
      console.log(selectedPlaylistId);

      setIsLoading(true);

      api
        .getPlaylist(selectedPlaylistId)
        .then((data) => {
          setPlaylist(data.body);
        })
        .catch((err) => console.log(err));

      setIsLoading(false);
    }
  }, [api, selectedPlaylistId]);

  if (!selectedPlaylistId) {
    return (
      <div className="bg-gradient-to-b from-red-900 h-1/2 no-scrollbar">
        <Header />
        <Featured />
        <h2 className="py-5 mx-8 text-3xl font-bold">Good Evening</h2>
        <RecentlyPlayed />
        <h2 className="pt-10 pb-5 mx-8 text-3xl font-bold">Top Tracks</h2>
        <TopTracks />
        <h2 className="pt-10 pb-5 mx-8 text-3xl font-bold">Made For You</h2>
        <FeaturedPlaylist />
      </div>
    );
  } else {
    console.log(playlist);

    if (playlist && playlist.images && playlist.owner && !isLoading) {
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
              <p className="pt-3 opacity-50 text-sm">{playlist.description}</p>
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

          <div className="py-10 px-10">
            <table className="table-fixed w-full">
              <thead className="border-b-[1.5px] border-neutral-700  text-md font-light text-neutral-400 text-left">
                <tr className="hover:bg-transparent">
                  <th>#</th>
                  <th>Title</th>
                  <th>Album</th>
                  <th>Duration</th>
                </tr>
              </thead>
              <tbody>
                {playlist.tracks.items.map((song, index) => {
                  return (
                    <tr>
                      <td>{index + 1}</td>
                      <td>
                        <div className="flex flex-row space-x-3">
                          <img
                            src={song.track.album.images[0].url}
                            className="w-10 h-10 rounded-sm"
                          ></img>
                          <div className="flex flex-col">
                            <p>{song.track.name}</p>
                            <div className="flex flex-row">
                              {song.track.album.artists.map((artist, index) => {
                                return (
                                  <div className=" flex flex-row">
                                    <p>{artist.name}</p>
                                    {index + 1 !==
                                      song.track.album.artists.length && (
                                      <span>, &nbsp</span>
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>1961</td> <td>1961</td>
                    </tr>
                  );
                })}

                <tr>
                  <td>2</td>
                  <td>The Eagles</td>
                  <td>1972</td> <td>1961</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>Earth, Wind, and Fire</td>
                  <td>1975</td> <td>1961</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      );
    }
  }
}
