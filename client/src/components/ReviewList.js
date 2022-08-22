import { Grid, GridItem, Heading } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import ReviewCard from './ReviewCard';

function Reviews({
  user,
  name,
  // topTracks,
  // setTopTracks,
  // recentTracks,
  // setRecentTracks,
}) {
  const [reviews, setReviews] = useState(null);

  // useEffect(() => {
  //   fetch('/api/tracks/top').then((r) => {
  //     if (r.ok) {
  //       r.json()
  //         .then((data) => setTopTracks(data))
  //         .catch((err) => {
  //           console.log(err.message);
  //         });
  //     }
  //   });
  //   fetch('/api/tracks/recent').then((r) => {
  //     if (r.ok) {
  //       r.json()
  //         .then((data) => setRecentTracks(data))
  //         .catch((err) => {
  //           console.log(err.message);
  //         });
  //     }
  //   });
  // }, []);

  console.log(user);
  return (
    <div>
      <div className='recently-played'>
        <Grid
          templateAreas={`"heading "
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
            // top={0}
            bg='white'
            zIndex={2}
          >
            <Heading size='xl'>Recent Reviews</Heading>
          </GridItem>
          {/* <h2>{user.full_name?.split(' ')[0]}'s Recently Played Tracks</h2> */}
          <GridItem pl='2' area={'body'} overflow-y='auto'>
            {/* <TrackList tracks={recentTracks} user={user} /> */}
          </GridItem>
        </Grid>
      </div>
      {/* <div className='most-played'>
        <h2>{user.full_name.split(' ')[0]}'s Most Played Tracks</h2>
        <TrackList tracks={recentTracks} />
      </div> */}
    </div>
  );
}

export default Reviews;
