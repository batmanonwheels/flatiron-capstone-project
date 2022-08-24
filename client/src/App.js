import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Tracks from './components/Tracks';
import SideBar from './components/SideBar';
import ReviewList from './components/ReviewList';
import Profile from './components/Profile';
import { Grid, GridItem, Text, Heading, Box, useToast } from '@chakra-ui/react';
import { theme } from '@chakra-ui/react';

function App() {
  const [user, setUser] = useState(null);
  const toast = useToast();
  // [recentTracks, setRecentTracks] = useState(null),
  // [topTracks, setTopTracks] = useState(null);
  useEffect(() => {
    fetch('/me').then((r) => {
      if (r.ok) {
        r.json()
          .then((data) => setUser(data))
          .then(console.log(user))
          .then(() =>
            setTimeout(
              toast({
                title: `Hey ${user.full_name.split(' ')[0]}!`,
                description: 'Welcome to Synesthesium!',
                position: 'bottom-right',
                variant: 'subtle',
                status: 'success',
                duration: 4500,
                isClosable: true,
              }),
              2000
            )
          )
          .catch((err) => {
            console.log(err.message);
          });
      }
    });
    // eslint-disable-next-line
  }, []);

  const handleLogout = (e) => {
    e.preventDefault();
    fetch('/logout', {
      method: 'DELETE',
    })
      .then((r) => r.json())
      .then(() => setUser(null));
    localStorage.removeItem('userInfo');
  };

  console.log(user);

  return (
    <BrowserRouter>
      <div className='App' style={{ maxW: '100vh' }}>
        <Grid
          templateAreas={`"nav main"
                  "nav main"
                  "nav footer"`}
          gridTemplateRows={'100px 1fr 80px'}
          gridTemplateColumns={'125px 1fr'}
          // maxW={'100vh'}
          h='100%'
          gap='2'
          color='black'
          fontWeight='bold'
        >
          <GridItem
            pl='2'
            rowStart={1}
            h='95vh'
            pos='sticky'
            // bottom={0}
            top={0}
            // h='auto'
            area={'nav'}
            paddingTop={3}
            bgGradient='linear(to-t, gray.200, white)'
            zIndex='5'
          >
            <Box>
              <SideBar
                // pos='sticky'
                user={user}
                setUser={setUser}
                handleLogout={handleLogout}
              />
            </Box>
          </GridItem>
          <GridItem pl='2' area={'main'} rowStart={1} minH={1000}>
            {user ? (
              <Routes>
                <Route
                  exact
                  path='/browse-reviews'
                  element={<ReviewList user={user} />}
                />
                <Route
                  exact
                  path='/review-form'
                  element={<ReviewList user={user} />}
                />
                {/* <Route
                  exact
                  path='/browse-tracks'
                  element={<Tracks user={user} />}
                /> */}
                <Route path='/me' element={<Profile user={user} />} />
                <Route
                  exact
                  path='/'
                  element={
                    <Tracks
                      user={user}
                      name={user.full_name}
                      // recentTracks={recentTracks}
                      // setRecentTracks={setRecentTracks}
                      // topTracks={topTracks}
                      // setTopTracks={setTopTracks}
                    />
                  }
                />
              </Routes>
            ) : (
              <Heading size='xl'>Loading Essential Data...</Heading>
            )}
          </GridItem>
          <GridItem
            pl='2'
            colStart={1}
            rowStart={0}
            bg='gray.200'
            pos='sticky'
            bottom={0}
            h='100%'
            area={'footer'}
            zIndex='5'
            bgGradient='linear(to-tr, gray.300,  white)'
          >
            <Heading size='4xl'>Synesthesium</Heading>
          </GridItem>
        </Grid>
      </div>
    </BrowserRouter>
  );
}

export default App;
