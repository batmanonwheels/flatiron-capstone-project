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
              // size='xl'
              href={user.uri}
              name={user.full_name}
              src={user.profile_pic}
              marginTop={3}
              w={'6.1vw'}
              h={'10vh'}
            />
          </Link>
          <Link to='/'>
            <Button
              marginTop={3}
              marginBottom={1}
              textColor={'white'}
              bgGradient='linear(to-tr, teal.400, gray.400)'
              w={'6.1vw'}
              h={'4.5vh'}
              fontSize='1.7vh'
            >
              Tracks
            </Button>
          </Link>
          <Link to='/browse-albums'>
            <Button
              marginTop={3}
              marginBottom={1}
              textColor={'white'}
              bgGradient='linear(to-tr, teal.400, gray.400)'
              w={'6.1vw'}
              h={'4.5vh'}
              fontSize='1.7vh'
            >
              Albums
            </Button>
          </Link>
          <Link to='/browse-reviews'>
            <Button
              marginTop={3}
              marginBottom={1}
              textColor={'white'}
              bgGradient='linear(to-tr, teal.400, gray.400)'
              w={'6.1vw'}
              h={'4.5vh'}
              fontSize='1.7vh'
            >
              Reviews
            </Button>
          </Link>
          <Button
            mt={3}
            // marginBottom={1}
            loadingText='See you soon!'
            textColor={'white'}
            bgGradient='linear(to-tr, teal.400, gray.400)'
            onClick={(e) => handleLogout(e)}
            variant='outline'
            w={'6.1vw'}
            h={'4.5vh'}
            fontSize='1.7vh'
          >
            Logout
          </Button>
          {/* <button onClick={(e) => handleLogout(e)}>Logout</button> */}
        </div>
      ) : (
        <a href='http://localhost:3000/api/v1/login'>
          <Button
            loadingText='Connecting...'
            bgGradient='linear(to-tr, teal.400, gray.400)'
            w={'6vw'}
            h={'5vh'}
            fontSize='1.7vh'
          >
            Login to <br></br> Spotify!
          </Button>
        </a>
      )}
    </header>
  );
}

export default Header;
