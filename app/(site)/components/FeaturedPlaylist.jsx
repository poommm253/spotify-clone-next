import useSpotify from "@/app/hooks/useSpotify";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import TrackItem from "./TrackItem";

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
    <div className="flex flex-row overflow-x-scroll no-scrollbar gap-x-5 mx-8 pb-5">
      {featuredPlaylist.map((featured) => {
        return (
          <TrackItem
            key={featured.name}
            imgUrl={featured.images[0].url}
            name={featured.name}
            description={featured.description}
          />
        );
      })}
    </div>
  );
}
