import { allPlaylistState } from "@/atoms/playlistAtom";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";

export default function RecentlyPlayed() {
  const playlist = useRecoilValue(allPlaylistState);
  let shuffled;
  let randomedList;

  useEffect(() => {
    shuffled = playlist ? [...playlist].sort(() => 0.5 - Math.random()) : null;
    randomedList = shuffled?.slice(0, 6);
  }, [playlist]);

  console.log(randomedList);
  return (
    <div className="grid grid-cols-2 gap-4 mx-8 md:grid-cols-3">
      {randomedList?.map((playlist) => {
        return <RecentlyPlayedCard title={playlist.named}></RecentlyPlayedCard>;
      })}
    </div>
  );
}

function RecentlyPlayedCard({ title }) {
  return (
    <div className="flex flex-row items-center space-x-4 transition rounded-lg opacity-75 cursor-pointer hover:bg-neutral-400 overflow-clip bg-neutral-500">
      <div className="w-20 h-20 bg-emerald-300"></div>
      <p className="py-2">{title}</p>
    </div>
  );
}
