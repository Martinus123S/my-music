import axios, { AxiosResponse } from "axios";
import { IPicturePlaylist, IPlaylist } from "./models";

const scopes = [
  "user-read-private",
  "playlist-modify-public",
  "playlist-modify-private",
  "playlist-read-private",
  "playlist-read-collaborative",
];

const authorizationAPI = "https://accounts.spotify.com/authorize";

export const login = () => {
  const clientId = "e479ddbea2d04ed28e765a238b51006b";
  const redirectUri = "http://localhost:3000";

  return `${authorizationAPI}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
    "%20"
  )}&response_type=token`;
};

const apiEndpoint = "https://api.spotify.com/v1";

export const getNameAPI = async () => {
  const data = localStorage.getItem("info");
  const parseData = JSON.parse(data || "{}");
  const access_token = parseData.access_token;
  try {
    const response = await axios.get(`${apiEndpoint}/me`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    return response.data;
  } catch (err) {
    return err.response;
  }
};

export const getPlaylistFromMe = async (limit: Number, offset?: Number) => {
  const data = localStorage.getItem("info");
  const parseData = JSON.parse(data || "{}");
  const access_token = parseData.access_token;
  try {
    const response = await axios.get(`${apiEndpoint}/me/playlists`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      params: {
        limit,
        offset,
      },
    });
    return response?.data;
  } catch (err) {
    throw err?.response?.data;
  }
};

export const getPlaylistTrack = async (
  playlistId: string | string[] | undefined,
  limit?: number,
  offset?: number
) => {
  const data = localStorage.getItem("info");
  const parseData = JSON.parse(data || "{}");
  const access_token = parseData.access_token;
  try {
    const response = await axios.get(
      `${apiEndpoint}/playlists/${playlistId}/tracks`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
        params: {
          limit,
          offset,
          market: "ES",
        },
      }
    );
    return response.data;
  } catch (err) {
    throw err?.response?.data;
  }
};

export const getValueFromParams = () => {
  return window.location.hash
    .substring(1)
    .split("&")
    .reduce(function (initial: { [key: string]: any }, item) {
      if (item) {
        var parts = item.split("=");
        initial[parts[0]] = decodeURIComponent(parts[1]);
      }
      return initial;
    }, {});
};

export const removeParams = () => {
  window.history.pushState(
    "",
    document.title,
    window.location.pathname + window.location.search
  );
};
