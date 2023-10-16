"use client";

import { useSession } from "next-auth/react";
import { fetchWebApi } from "../../../utils/spotify";
import { useCallback, useEffect, useState } from "react";
import TrackItem from "./TrackItem";
import { topTrackState } from "@/atoms/playlistAtom";
import { useRecoilValue } from "recoil";

export default function Recommendations() {
  const { data: session } = useSession();
  const topTrack = useRecoilValue(topTrackState);
  const [recommendedTracks, setRecommendedTracks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchRecommendations = useCallback(async (accessToken) => {
    setIsLoading(true);
    const topTrackId = [];

    console.log(topTrack);

    if (topTrack.length > 0) {
      topTrack.forEach((element) => {
        topTrackId.push(element.id);
      });
    } else {
      topTrackId.push("3o9kpgkIcffx0iSwxhuNI2");
      topTrackId.push("12usPU2WnqgCHAW1EK2dfd");
      topTrackId.push("0GWNtMohuYUEHVZ40tcnHF");
      topTrackId.push("7pTwW5yCKRx6OkByY53jbz");
      topTrackId.push("6IO5nn84TKArsi3cjpIqaD");
    }

    const response = await fetchWebApi(
      `v1/recommendations?limit=10&seed_tracks=${topTrackId.join(",")}`,
      "GET",
      accessToken
    );

    setRecommendedTracks(response.tracks);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (session && topTrack) {
      const accessToken = session.user.accessToken;
      fetchRecommendations(accessToken);
    }
  }, [session, topTrack]);

  console.log(recommendedTracks);

  if (!isLoading && recommendedTracks && recommendedTracks.length > 0)
    return (
      <div className="flex flex-row overflow-x-scroll no-scrollbar gap-x-5 mx-8 pb-5">
        {recommendedTracks.map((recommendation) => {
          return (
            <TrackItem
              key={recommendation.id}
              imgUrl={recommendation.album.images[0].url}
              name={recommendation.artists[0].name}
            />
          );
        })}
      </div>
    );
}
