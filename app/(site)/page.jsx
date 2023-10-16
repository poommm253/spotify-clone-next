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
import Recommendations from "./components/Recommendations";
import { BsFillPlayFill, BsFillPlayCircleFill } from "react-icons/bs";
import { AiFillHeart } from "react-icons/ai";
import { FiMoreHorizontal } from "react-icons/fi";

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
        <h2 className="pt-10 pb-5 mx-8 text-3xl font-bold">Recommendations</h2>
        <Recommendations />
        <h2 className="pt-10 pb-5 mx-8 text-3xl font-bold">Made For You</h2>
        <FeaturedPlaylist />
      </div>
    );
  } else {
    console.log(playlist);

    if (playlist && playlist.images && playlist.owner && !isLoading) {
      const bgColor = [
        "from-purple-800",
        "from-red-800",
        "from-yellow-800",
        "from-blue-800",
      ];
      return (
        <div
          className={`bg-gradient-to-b ${
            bgColor[Math.floor(Math.random() * bgColor.length)]
          } h-1/2`}
        >
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

          <div className="items-center mx-5 space-x-5 flex flex-row text-green-400">
            <BsFillPlayCircleFill className="cursor-pointer" size={60} />
            <AiFillHeart className="cursor-pointer" size={40} />
            <FiMoreHorizontal
              className="text-neutral-400 cursor-pointer"
              size={40}
            />
          </div>

          <div className="py-10 px-10">
            <table className="w-full">
              <thead className="border-b-[1.5px] border-neutral-700  text-md font-light text-neutral-400 text-left">
                <tr className="hover:bg-transparent">
                  <th className="text-center" width="50">
                    #
                  </th>
                  <th>Title</th>
                  <th>Album</th>
                  <th>Duration</th>
                </tr>
              </thead>
              <tbody className="rounded-lg">
                {playlist.tracks.items.map((song, index) => {
                  return (
                    <tr className="group relative">
                      <td className="group-hover:hidden text-center" width="50">
                        {index + 1}
                      </td>
                      <td
                        className="absolute cursor-pointer hidden group-hover:flex justify-center items-center h-full"
                        width="50"
                      >
                        <BsFillPlayFill />
                      </td>
                      <td>
                        <div className="flex flex-row items-center space-x-3">
                          <img
                            src={song.track.album.images[0].url}
                            className="w-10 h-10 rounded-sm"
                          ></img>
                          <div className="flex flex-col">
                            <p>{song.track.name}</p>
                            <div className="flex flex-row">
                              {song.track.album.artists.map((artist, index) => {
                                return (
                                  <div className=" flex flex-row text-sm text-neutral-500">
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
                      <td>{song.track.album.name}</td>{" "}
                      <td>
                        {millisToMinutesAndSeconds(song.track.duration_ms)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      );
    }
  }
}

function millisToMinutesAndSeconds(millis) {
  var minutes = Math.floor(millis / 60000);
  var seconds = ((millis % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
}
