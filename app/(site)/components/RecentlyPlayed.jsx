import { allPlaylistState } from "@/atoms/playlistAtom";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";

export default function RecentlyPlayed() {
  const playlist = useRecoilValue(allPlaylistState);

  return (
    <div className="grid grid-cols-2 gap-4 mx-8 md:grid-cols-3">
      {playlist &&
        [...playlist]
          .sort(() => 0.5 - Math.random())
          ?.slice(0, 6)
          .map((playlist) => {
            return (
              <RecentlyPlayedCard
                key={playlist.name}
                title={playlist.name}
                img={playlist.images[0].url}
              ></RecentlyPlayedCard>
            );
          })}
      {!playlist && (
        <>
          <div className="flex flex-row items-center h-20 space-x-4 transition rounded-lg opacity-75 cursor-pointer hover:bg-neutral-400 overflow-clip bg-neutral-500">
            <div className="w-20 h-20 bg-emerald-300"></div>
            <p className="py-2"></p>
          </div>
          <div className="flex flex-row items-center h-20 space-x-4 transition rounded-lg opacity-75 cursor-pointer hover:bg-neutral-400 overflow-clip bg-neutral-500">
            <div className="w-20 h-20 bg-emerald-300"></div>
            <p className="py-2"></p>
          </div>
          <div className="flex flex-row items-center h-20 space-x-4 transition rounded-lg opacity-75 cursor-pointer hover:bg-neutral-400 overflow-clip bg-neutral-500">
            <div className="w-20 h-20 bg-emerald-300"></div>
            <p className="py-2"></p>
          </div>
          <div className="flex flex-row items-center h-20 space-x-4 transition rounded-lg opacity-75 cursor-pointer hover:bg-neutral-400 overflow-clip bg-neutral-500">
            <div className="w-20 h-20 bg-emerald-300"></div>
            <p className="py-2"></p>
          </div>
          <div className="flex flex-row items-center h-20 space-x-4 transition rounded-lg opacity-75 cursor-pointer hover:bg-neutral-400 overflow-clip bg-neutral-500">
            <div className="w-20 h-20 bg-emerald-300"></div>
            <p className="py-2"></p>
          </div>
          <div className="flex flex-row items-center h-20 space-x-4 transition rounded-lg opacity-75 cursor-pointer hover:bg-neutral-400 overflow-clip bg-neutral-500">
            <div className="w-20 h-20 bg-emerald-300"></div>
            <p className="py-2"></p>
          </div>
        </>
      )}
    </div>
  );
}

function RecentlyPlayedCard({ title, img }) {
  return (
    <div className="flex flex-row items-center h-20 space-x-4 transition rounded-lg opacity-75 cursor-pointer hover:bg-neutral-700 overflow-clip bg-neutral-800">
      <img src={img} className="w-20 h-20 "></img>
      <p className="py-2">{title}</p>
    </div>
  );
}
