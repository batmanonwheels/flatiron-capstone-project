import React from 'react';
import { useState, useContext } from 'react';
import {
  Box,
  Grid,
  GridItem,
  Heading,
  HStack,
  Progress,
} from '@chakra-ui/react';

import { useToast } from '@chakra-ui/react';
import FavoriteCard from './FavoriteCard';
import UserContext from '../context/user';
import ProfileCommentCard from './ProfileCommentCard';
import ProfileReviewCard from './ProfileReviewCard';

const useForceUpdate = () => {
  const set = useState(false)[1];
  return () => set((s) => !s);
};

const Profile = ({}) => {
  const toast = useToast();
  const { user, setUser } = useContext(UserContext);

  const forceUpdate = useForceUpdate();

  const handleReviewFavClick = (e) => {
    // e.preventDefault();
    // handleFavorite(track);
    // setButtonText('Added to Favorites');
    // setButtonColor('');
    toast({
      title: `Writing Review!`,
      position: 'bottom-right',
      variant: 'subtle',
      status: 'success',
      duration: 4500,
      isClosable: true,
    });
  };
  return (
    <div className='recently-played'>
      <Grid
        templateAreas={`"heading"
                  "body"
                  "form"`}
        gridTemplateRows={'35px 1fr'}
        // gridTemplateColumns={'100px 1fr'}
        // h='200px'
        // gap='1'
        maxW='100vh'
        color='blackAlpha.700'
        fontWeight='bold'
      >
        <GridItem
          pl='2'
          area={'heading'}
          // pos='sticky'
          // top={0}
          bg='white'
          zIndex={5}
          pb='10'
        >
          <Heading size='xl'>{user.full_name}'s</Heading>
        </GridItem>
        {/* <h2>{user.full_name?.split(' ')[0]}'s Recently Played Tracks</h2> */}
        <GridItem
          pl='2'
          area={'body'}
          overflow-y='auto'
          zIndex={3}
          // border='1px solid'
        >
          <Box>
            <Heading size='2xl'>Favorite Tracks</Heading>
            {/* <Heading size='xl'>
                Hover over a track to remove it from your favorites or review
                it!
              </Heading> */}
            <HStack
              spacing='24px'
              mt='10px'
              overflowX='scroll'
              maxW='161vh'
              height='40vh'
              pl={'5px'}
              pr={'5px'}
            >
              {user.tracks.map((track) => (
                <Box>
                  <FavoriteCard
                    key={track.id}
                    user={user}
                    track={track}
                    // onToggle={onToggle}
                    // handleDeleteClick={handleDeleteFavClick}
                    handleReviewClick={handleReviewFavClick}
                    forceUpdate={forceUpdate}
                  />
                </Box>
              ))}
            </HStack>
            <Heading size='2xl'>Comments</Heading>
            <Grid
              templateColumns='repeat(4, 1fr)'
              templateRows={'repeat(1, 1fr)'}
              gap={3}
              padding={2}
              height={'12vh'}
              overflowX='scroll'
            >
              {user.comments ? (
                user.comments.map((comment) => (
                  <ProfileCommentCard comment={comment} />
                ))
              ) : (
                <Progress
                  size='md'
                  w='145vh'
                  colorScheme='teal'
                  isIndeterminate
                />
              )}
            </Grid>
            <Heading size='2xl'>Reviews</Heading>
            <Grid
              templateColumns='repeat(3, 1fr)'
              templateRows={'repeat(2, 1fr)'}
              gap={3}
              padding={2}
              height={'35vh'}
              overflowY='scroll'
            >
              {user.reviews ? (
                user.reviews.map((review) => (
                  <ProfileReviewCard review={review} />
                ))
              ) : (
                <Progress
                  size='md'
                  w='145vh'
                  colorScheme='teal'
                  isIndeterminate
                />
              )}
            </Grid>
          </Box>
        </GridItem>
        <GridItem pl='2' area={'form'} zIndex={3}></GridItem>
      </Grid>
    </div>
  );
};

export default Profile;
