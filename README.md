# Skilvul music

Music app that built using Spotify API

### Tech

# [ReactJS] - Frontend Library

Other libs

- [Chakra UI] - For website styling
- [React Router] - For website navigation
- [React Icons] - For custom icon
- [axios] - For Data Fetching

### Installation and run locally

Install the dependencies and devDependencies and start the server.
Before you start this apps, dont forget to copy client_id and fill redirect_uri in your spotify dashboard

```sh
$ cp .env.development.local.example .env.development.local
$ yarn install
$ yarn dev
```

.env fill with your client spotify app id

```sh
$ REACT_APP_SPOTIFY_CLIENT_ID='YOUR CLIENT ID'
$ REACT_APP_REDIRECT_URI=http://localhost:3000
```

[reactjs]: http://reactjs.org
[chakra ui]: https://chakra-ui.com/
[axios]: https://github.com/axios/axios
