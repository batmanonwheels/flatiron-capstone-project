import React, { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Home';
// import './App.css';
import Header from './Header';

function App() {
  const [user, setUser] = useState(null),
    [recentTracks, setRecentTracks] = useState({}),
    [topTracks, setTopTracks] = useState({});

  useEffect(() => {
    fetch('/myaccount').then((r) => {
      if (r.ok) {
        r.json()
          .then((data) => setUser(data))
          .then(
            fetch('/tracks/top').then((r) => {
              if (r.ok) {
                r.json().then((data) => setTopTracks(data));
              }
            })
          )
          .then(
            fetch('/tracks/recent').then((r) => {
              if (r.ok) {
                r.json().then((data) => setRecentTracks(data));
              }
            })
          );
      }
    });
  }, []);

  console.log(user);
  console.log(topTracks);
  console.log(recentTracks);

  return (
    <div className='App'>
      <Header user={user} setUser={setUser} />
      <Switch>
        <Route exact path='/'>
          <Home recentTracks={recentTracks} setRecentTracks={setRecentTracks} />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
