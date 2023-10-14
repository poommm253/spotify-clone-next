import useSpotify from "@/app/hooks/useSpotify";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export default function FeaturedPlaylist() {
  const api = useSpotify();
  const { data: session } = useSession();
  const [featuredPlaylist, setFeaturedPlaylist] = useState([]);

  useEffect(() => {
    if (api.getAccessToken())
      api.getFeaturedPlaylists({ limit: 6, country: "CA" }).then((data) => {
        setFeaturedPlaylist(data.body.playlists.items);
      });
  }, [session, api]);

  console.log(featuredPlaylist);

  return (
    // <div className="flex mx-8 space-x-3 overflow-auto">
    //   <div className="flex-shrink-0 w-fit bg-neutral-800 hover:bg-neutral-700 rounded-lg opacity-75">
    //     <img className="h-40 w-40 p-5"></img>
    //   </div>
    //   <div className="flex-shrink-0 w-fit bg-neutral-800 hover:bg-neutral-700 rounded-lg opacity-75">
    //     <img className="h-40 w-40 p-5"></img>
    //   </div>
    //   <div className="flex-shrink-0 w-fit bg-neutral-800 hover:bg-neutral-700 rounded-lg opacity-75">
    //     <img className="h-40 w-40 p-5"></img>
    //   </div>
    //   <div className="flex-shrink-0 w-fit bg-neutral-800 hover:bg-neutral-700 rounded-lg opacity-75">
    //     <img className="h-40 w-40 p-5"></img>
    //   </div>
    //   <div className="flex-shrink-0 w-fit bg-neutral-800 hover:bg-neutral-700 rounded-lg opacity-75">
    //     <img className="h-40 w-40 p-5"></img>
    //   </div>
    //   <div className="flex-shrink-0 w-fit bg-neutral-800 hover:bg-neutral-700 rounded-lg opacity-75">
    //     <img className="h-40 w-40 p-5"></img>
    //   </div>
    // </div>
    <div className="flex flex-row overflow-x-scroll no-scrollbar gap-x-5 mx-8 pb-5">
      {featuredPlaylist.map((featured) => {
        return (
          <div className="flex-shrink-0 w-40 p-5 space-y-2 bg-neutral-800 hover:bg-neutral-700 rounded-lg opacity-75">
            <img src={featured.images[0].url} className="rounded-lg "></img>
            <p className="text-lg font-bold">{featured.name}</p>
            <p className="text-xs text-neutral-400">
              {featured.description.slice(0, 28)}...
            </p>
          </div>
        );
      })}
    </div>
  );
}
