import React, { useState, useEffect, useContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Tracks from './components/Tracks';
import SideBar from './components/SideBar';
import Reviews from './components/Reviews';
import Profile from './components/Profile';
import Albums from './components/Albums';
import {
  Grid,
  GridItem,
  Text,
  Heading,
  Box,
  useToast,
  Progress,
} from '@chakra-ui/react';
import { theme } from '@chakra-ui/react';
// import UserContext from './context/user';
import UserContext from './context/user';
import { FasterOne } from '@fontsource/faster-one';

function App() {
  const { user, setUser } = useContext(UserContext);

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
                  element={<Reviews me={user} />}
                />
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
                <Route
                  exact
                  path='/browse-albums'
                  element={<Albums user={user} name={user.full_name} />}
                />
              </Routes>
            ) : (
              <>
                <Heading size='xl'>Loading Essential Data...</Heading>
                <Progress
                  size='md'
                  w='145vh'
                  colorScheme='teal'
                  isIndeterminate
                />
              </>
            )}
          </GridItem>
          <GridItem
            pl='2'
            colStart={1}
            rowStart={10}
            bg='gray.200'
            pos='sticky'
            bottom={0}
            h='100%'
            area={'footer'}
            zIndex='5'
            bgGradient='linear(to-tr, gray.300,  white)'
          >
            <Heading
              fontSize='93px'
              size={'4xl'}
              bgClip='text'
              bgGradient='linear(to-r,teal.400, pink.300)'
              zIndex='6'
              sx={{
                fontFamily: 'Faster One',
              }}
            >
              Synesthesia
            </Heading>
          </GridItem>
        </Grid>
      </div>
    </BrowserRouter>
  );
}

export default App;
