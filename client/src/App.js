import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Cookies from 'js-cookie';
import Home from './Home';
import Header from './Header';

function App() {
  const [tracks, setTracks] = useState([]);
  const [token, setToken] = useState(Cookies.get('spotifyAuthToken'));

  console.log(Cookies.get('spotifyAuthToken'));
  useEffect(() => {
    fetch('/tracks')
      .then((r) => r.json())
      .then((data) => setTracks(data));
  }, []);
  console.log(tracks);

  return (
    <div className='App'>
      <Header token={token} setToken={setToken} />
      <BrowserRouter>
        <Switch>
          {/* <Route path='*'>
            <h1>Not Found!</h1>
          </Route> */}
          <Route exact path='/'>
            <Home tracks={tracks} />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
