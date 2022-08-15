import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Cookies from 'js-cookie';
import Home from './Home';
import Header from './Header';

function App() {
  const [user, setUser] = useState(null);
  // const [tracks, setTracks] = useState([]);

  // console.log(Cookies.get('spotifyAuthToken'));
  // useEffect(() => {
  //   fetch('v1/login/index')
  //     .then((r) => r.json())
  //     .then((data) => setUser(data));
  // }, []);
  // console.log(tracks);

  return (
    <div className='App'>
      <Header user={user} setUser={setUser} />
      <BrowserRouter>
        <Switch>
          {/* <Route path='*'>
            <h1>Not Found!</h1>
          </Route> */}
          <Route exact path='/'>
            <Home />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
