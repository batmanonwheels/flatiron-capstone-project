import React from 'react';
// import { slide as Menu } from 'react-burger-menu';

function Header({ user, setUser }) {
  // const [navBarOpen, setNavBarOpen] = useState(false);

  const handleClick = () => {
    fetch('v1/login/index')
      .then((r) => r.json())
      .then((data) => setUser(data));
  };

  return (
    <header>
      {/* <button onClick={handleToggle}>{navBarOpen ? 'Close' : 'Open'}</button> */}
      <h1 id='site-title'>Synesthesium</h1>
      {user ? (
        <button>{`Logout ${user.full_name}`}</button>
      ) : (
        <a href='http://localhost:3000/api/v1/login/index'>
          <button>Login to Spotify!</button>
        </a>
      )}
    </header>
  );
}

export default Header;
