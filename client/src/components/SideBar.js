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
              minW={'5vw'}
              href={user.uri}
              name={user.full_name}
              src={user.profile_pic}
              marginTop={3}
              height={''}
              minH={'8vh'}
            />
          </Link>
          <Link to='/'>
            <Button
              marginTop={3}
              marginBottom={1}
              colorScheme='teal'
              minW={'10vh'}
            >
              Tracks
            </Button>
          </Link>
          <Link to='/browse-albums'>
            <Button
              marginTop={3}
              marginBottom={1}
              colorScheme='teal'
              minW={'10vh'}
            >
              Albums
            </Button>
          </Link>
          <Link to='/browse-reviews'>
            <Button
              marginTop={3}
              marginBottom={1}
              colorScheme='teal'
              minW={'10vh'}
            >
              Reviews
            </Button>
          </Link>
          <Button
            mt={3}
            // marginBottom={1}
            loadingText='See you soon!'
            colorScheme='teal'
            onClick={(e) => handleLogout(e)}
            variant='outline'
            minW={'10vh'}
          >
            Logout
          </Button>
          {/* <button onClick={(e) => handleLogout(e)}>Logout</button> */}
        </div>
      ) : (
        <a href='http://localhost:3000/api/v1/login'>
          <Button loadingText='Connecting...' colorScheme='teal' maxW='100%'>
            Login to <br></br> Spotify!
          </Button>
        </a>
      )}
    </header>
  );
}

export default Header;
