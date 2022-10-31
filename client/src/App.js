import React, { useContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Tracks from './components/Tracks';
import SideBar from './components/SideBar';
import Reviews from './components/Reviews';
import Profile from './components/Profile';
import Albums from './components/Albums';
import BottomBar from './components/BottomBar';
import { Grid, GridItem, Heading, Progress } from '@chakra-ui/react';
import UserContext from './context/user';

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
      <div className='App' maxW={'100%'}>
        <Grid
          templateAreas={`"nav main"
                  "nav main"
                  "nav footer"`}
          // gridTemplateRows={'100vh 1fr '}
          gridTemplateColumns={'7.25vw 1fr'}
          // maxW={'100vh'}
          h='100vh'
          gap='2'
          color='black'
          fontWeight='bold'
          overflowX='hidden'
        >
          <GridItem
            pl='2'
            rowStart={1}
            h={'95%'}
            pos='sticky'
            // bottom={0}
            top={0}
            // h='auto'
            area={'nav'}
            paddingTop={3}
            bgGradient='linear(to-t, gray.200, white)'
            zIndex='5'
          >
            <SideBar
              // pos='sticky'
              user={user}
              setUser={setUser}
              handleLogout={handleLogout}
            />
          </GridItem>
          <GridItem
            pl='2'
            area={'main'}
            rowStart={1}
            minH={1000}
            pr='2'
            // maxH='100%'
          >
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
            pl='0.1'
            colStart={1}
            rowStart={10}
            bg='gray.200'
            bottom={0}
            pos='fixed'
            h='9.5vh'
            minW={'100%'}
            area={'footer'}
            zIndex='5'
            paddingTop={0}
            bgGradient='linear(to-tr, gray.300, white)'
            // sx={{ position: 'sticky' bottom}}
          >
            <BottomBar />
          </GridItem>
        </Grid>
      </div>
    </BrowserRouter>
  );
}

export default App;
