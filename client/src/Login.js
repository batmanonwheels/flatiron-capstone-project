import React, { useState } from 'react';
import { SpotifyApiContext } from 'react-spotify-api';
import { SpotifyAuth, Scopes } from 'react-spotify-auth';
import 'react-spotify-auth/dist/index.css';
import { client_id } from './keys/spotify_keys';

const Login = ({ token, setToken }) => {
  console.log(token);

  return (
    <div className='app'>
      {token ? (
        <SpotifyApiContext.Provider value={token}>
          {/* Your Spotify Code here */}
          <p>You are authorized with token: {token}</p>
        </SpotifyApiContext.Provider>
      ) : (
        <SpotifyAuth
          redirectUri='http://localhost:4000'
          clientID={client_id}
          scopes={[Scopes.userReadPrivate, 'user-read-email']}
          onAccessToken={(token) => setToken(token)}
        />
      )}
    </div>
  );
};
export default Login;
