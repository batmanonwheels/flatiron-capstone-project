import React, { useEffect, useState, useContext } from 'react';
import UserContext from '../context/user';
import { Grid, GridItem, Heading } from '@chakra-ui/react';
import AlbumList from './AlbumList';

const Albums = () => {
  const { user, setUser } = useContext(UserContext);
  const [albums, setAlbums] = useState(null);

  useEffect(() => {
    fetch('/api/albums/saved').then((r) => {
      if (r.ok) {
        r.json()
          .then((data) => setAlbums(data))
          .catch((err) => {
            console.log(err.message);
          });
      }
    });
  }, []);

  console.log(albums);
  return (
    <div className='recently-played'>
      <Grid
        templateAreas={`"heading"
                  "body"`}
        gridTemplateRows={'35px 1fr'}
        // gridTemplateColumns={'100px 1fr'}
        // h='200px'
        // gap='1'
        color='blackAlpha.700'
        fontWeight='bold'
      >
        <GridItem
          pl='2'
          area={'heading'}
          // pos='sticky'
          // bottom={0}
          // top={0}
          bg='white'
          zIndex={998}
        >
          <Heading size='xl'>
            {user.full_name?.split(' ')[0]}'s Recently Saved Albums
          </Heading>
        </GridItem>
        {/* <h2>{user.full_name?.split(' ')[0]}'s Recently Played Tracks</h2> */}
        <GridItem pl='2' area={'body'} overflow-y='auto'>
          <AlbumList user={user} setAlbums={setAlbums} albums={albums} />
        </GridItem>
      </Grid>
    </div>
  );
};

export default Albums;
