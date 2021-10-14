import axios from "axios";

const scopes = [
  "user-read-private",
  "playlist-modify-public",
  "playlist-modify-private",
  "playlist-read-private",
  "playlist-read-collaborative",
];

const BASED_URL = "https://accounts.spotify.com/authorize";

export const login = () => {
  const clientId = "7c95eb12b48d413b99757974a562a019";
  const redirectUri = "http://localhost:3000";

  return `${BASED_URL}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
    "%20"
  )}&response_type=token`;
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
