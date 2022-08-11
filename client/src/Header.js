import React, { useState } from 'react';
// import { slide as Menu } from 'react-burger-menu';
import Login from './Login';

function Header({ token, setToken }) {
  // const [navBarOpen, setNavBarOpen] = useState(false);

  // const handleToggle = () => {
  //   setNavBarOpen((prev) => !prev);
  // };

  return (
    <header>
      {/* <button onClick={handleToggle}>{navBarOpen ? 'Close' : 'Open'}</button> */}
      <h1 id='site-title'>Synesthesium</h1>
      <Login token={token} setToken={setToken} />
    </header>
  );
}

export default Header;
