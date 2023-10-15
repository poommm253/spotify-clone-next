"use client";

import { useSession } from "next-auth/react";
import { fetchWebApi } from "../../../utils/spotify";
import { useCallback, useEffect, useState } from "react";
import TrackItem from "./TrackItem";

export default function TopTracks() {
  const { data: session } = useSession();
  const [topTracks, setTopTracks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchTopTracks = useCallback(async (accessToken) => {
    setIsLoading(true);

    const response = await fetchWebApi(
      "v1/me/top/tracks?time_range=short_term&limit=5",
      "GET",
      accessToken
    );

    setTopTracks(response.items);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (session) {
      const accessToken = session.user.accessToken;
      fetchTopTracks(accessToken);
    }
  }, [session]);

  console.log(topTracks);

  if (!isLoading && topTracks && topTracks.length > 0) {
    return (
      <div className="flex flex-row overflow-x-scroll no-scrollbar gap-x-5 mx-8 pb-5">
        {topTracks.map((track, index) => {
          return (
            <TrackItem
              name={track.name}
              imgUrl={track.album.images[0].url}
              description={`Track ${index + 1}`}
            />
          );
        })}
      </div>
    );
  }
}
