import React from 'react';

// import { slide as Menu } from 'react-burger-menu';

function Header({ user, setUser }) {
  // const [navBarOpen, setNavBarOpen] = useState(false);
  // const secure = window.location.protocol === 'https';

  const handleDelete = (e) => {
    e.preventDefault();
    fetch('/logout', {
      method: 'DELETE',
    })
      .then((r) => r.json())
      .then((data) => setUser(data));
  };

  return (
    <header>
      <h1 id='site-title'>Synesthesium</h1>
      {user && !user.error ? (
        <div>
          <h2>Welcome, {user.full_name.split(' ')[0]}!</h2>
          <button onClick={(e) => handleDelete(e)}>Logout</button>
        </div>
      ) : (
        <a href='http://localhost:3000/api/v1/login'>
          <button>Login to Spotify!</button>
        </a>
      )}
    </header>
  );
}

export default Header;
