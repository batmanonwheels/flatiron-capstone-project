import { Grid, GridItem, Heading } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import TrackList from './TrackList';

function Tracks({ user, name, trigger }) {
  const [recentTracks, setRecentTracks] = useState(null);

  useEffect(() => {
    fetch('/api/tracks/recent').then((r) => {
      if (r.ok) {
        r.json()
          .then((data) => setRecentTracks(data))
          .catch((err) => {
            console.log(err.message);
          });
      }
    });
  }, [trigger]);

  // console.log(topTracks);
  // console.log(recentTracks);

  // const tracks = {
  //   recentTracks,
  //   topTracks,
  // // };

  // console.log(topTracks.items[0].album.name);
  // console.log(user);
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
          <Heading size='xl' fontSize={'3.5vh'} marginBottom={'0vh'}>
            {user.full_name?.split(' ')[0]}'s Recently Played Tracks
          </Heading>
        </GridItem>
        {/* <h2>{user.full_name?.split(' ')[0]}'s Recently Played Tracks</h2> */}
        <GridItem pl='2' area={'body'} overflow-y='auto'>
          <TrackList
            tracks={recentTracks}
            setTracks={setRecentTracks}
            user={user}
          />
        </GridItem>
      </Grid>
    </div>
  );
}

export default Tracks;
