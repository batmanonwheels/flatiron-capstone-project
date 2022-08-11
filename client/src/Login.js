import React, { useState } from 'react';
import { SpotifyApiContext } from 'react-spotify-api';
import { SpotifyAuth, Scopes } from 'react-spotify-auth';
import 'react-spotify-auth/dist/index.css';

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
          redirectUri='http://localhost:4000/'
          clientID='22fc10c6008e4813851ab8373f9cc299'
          scopes={[Scopes.userReadPrivate, 'user-read-email']}
          onAccessToken={(token) => setToken(token)}
        />
      )}
    </div>
  );
};
export default Login;
