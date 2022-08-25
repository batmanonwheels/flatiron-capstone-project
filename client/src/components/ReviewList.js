import React, { useEffect, useState } from 'react';
import ReviewCard from './ReviewCard';
import { Grid, GridItem, Heading, Progress } from '@chakra-ui/react';

function ReviewList({ user }) {
  const [reviews, setReviews] = useState(null);

  useEffect(() => {
    fetch('/api/reviews').then((r) => {
      if (r.ok) {
        r.json()
          .then((data) => setReviews(data))
          .catch((err) => {
            console.log(err.message);
          });
      }
    });
  }, []);
  console.log(reviews);
  // const handleFavorite = (track) => {
  // console.log('Creating/Finding track in DB');
  // const favoriteObj = {
  //   track: track,
  //   user_id: user.id,
  // };
  // console.log(`Tracks name is ${track.title}`);
  // fetch('/api/favorites', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify(favoriteObj),
  // }).then((r) => r.json());
  // };
  return (
    <div className='review-list'>
      <Grid
        templateColumns='repeat(2, 1fr)'
        templateRows={'repeat(2, 1fr)'}
        gap={3}
        padding={2}
        // height={'100vh'}
        // overflowY='scroll'
      >
        {reviews ? (
          reviews.map((review) => (
            <ReviewCard key={review.id} review={review} me={user} />
          ))
        ) : (
          <Progress size='md' w='145vh' colorScheme='teal' isIndeterminate />
        )}
      </Grid>
    </div>
  );
}

export default ReviewList;
