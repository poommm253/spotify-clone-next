import { atom } from "recoil";

export const playlistState = atom({
  key: "playlistState",
  default: [],
});

export const allPlaylistState = atom({
  key: "allPlaylistState",
  default: null,
});

export const playlistIdState = atom({
  key: "playlistIdState", // Must be unique id for each recoil atom state
  default: null,
});
