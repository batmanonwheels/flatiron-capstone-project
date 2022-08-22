import React from 'react';
import { Avatar, Button } from '@chakra-ui/react';
import { NavLink as Link } from 'react-router-dom';

function Header({ user, setUser, handleLogout }) {
  // const [navBarOpen, setNavBarOpen] = useState(false);
  // const secure = window.location.protocol === 'https';

  return (
    <header>
      {user ? (
        <div className='user-profile'>
          <Link to='/me'>
            <Avatar
              size='xl'
              href={user.uri}
              name={user.full_name}
              src={user.profile_pic}
              marginTop={3}
            />
          </Link>
          <Button marginTop={3} marginBottom={1} colorScheme='teal'>
            <Link to='/'>Tracks</Link>
          </Button>
          <Button marginTop={3} marginBottom={1} colorScheme='teal'>
            <Link to='/browse-reviews'>Reviews</Link>
          </Button>
          <Button
            mt={3}
            // marginBottom={1}
            loadingText='See you soon!'
            colorScheme='teal'
            onClick={(e) => handleLogout(e)}
          >
            Logout
          </Button>
          {/* <button onClick={(e) => handleLogout(e)}>Logout</button> */}
        </div>
      ) : (
        <a href='http://localhost:3000/api/v1/login'>
          <Button
            isLoading
            loadingText='Connecting to your Spotify Account'
            colorScheme='green'
          >
            Login to Spotify!
          </Button>
        </a>
      )}
    </header>
  );
}

export default Header;
