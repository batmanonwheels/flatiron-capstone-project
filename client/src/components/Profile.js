import React from 'react';
import { useState } from 'react';
import {
  Box,
  Grid,
  GridItem,
  Heading,
  HStack,
  // Collapse,
  // SliderTrack,
  // SliderMark,
  // Slider,
  // SliderThumb,
  // SliderFilledTrack,
  // Textarea,
  // Input,
} from '@chakra-ui/react';

import { useToast } from '@chakra-ui/react';
import FavoriteCard from './FavoriteCard';
import ReviewCard from './ReviewCard';

const Profile = ({ user }) => {
  const toast = useToast();
  // const { isOpen, onToggle } = useDisclosure();
  const handleReviewClick = (e) => {
    // e.preventDefault();
    // handleFavorite(track);
    // setButtonText('Added to Favorites');
    // setButtonColor('');
    toast({
      title: `Here we go!`,
      description: 'Writing Review!',
      position: 'bottom-right',
      variant: 'subtle',
      status: 'success',
      duration: 4500,
      isClosable: true,
    });
  };
  const defaultReviewData = { title: '', description: '', rating: 0 };

  const [formData, setFormData] = useState(defaultReviewData);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDeleteClick = (e) => {
    // e.preventDefault();
    // handleFavorite(track);
    // setButtonText('Added to Favorites');
    // setButtonColor('');
    toast({
      title: `Here we go!`,
      description: 'Writing Review!',
      position: 'bottom-right',
      variant: 'subtle',
      status: 'success',
      duration: 4500,
      isClosable: true,
    });
  };

  console.log(user);
  return (
    <div>
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
                maxW='150vh'
                height='50vh'
              >
                {user.tracks.map((track) => (
                  <Box>
                    <FavoriteCard
                      key={track.id}
                      user={user}
                      track={track}
                      // onToggle={onToggle}
                      handleDeleteClick={handleDeleteClick}
                      handleReviewClick={handleReviewClick}
                    />
                  </Box>
                ))}
              </HStack>
              <Heading size='2xl'>Reviews</Heading>
              <HStack
                spacing='24px'
                mt='10px'
                overflowX='scroll'
                maxW='150vh'
                height='50vh'
              >
                {user.reviews.map((track) => (
                  <Box>
                    <ReviewCard
                      key={track.id}
                      user={user}
                      track={track}
                      // onToggle={onToggle}
                      handleDeleteClick={handleDeleteClick}
                      handleReviewClick={handleReviewClick}
                    />
                  </Box>
                ))}
              </HStack>
            </Box>
          </GridItem>
          <GridItem
            pl='2'
            area={'form'}
            // overflow-y='auto'
            zIndex={3}
            // rowStart={10}
            // border='1px solid'
          >
            {/* <Collapse in={isOpen} animateOpacity>
              <Box
                border='1px solid'
                p='30px'
                color='blackAlpha.900'
                mt='10'
                maxW={'100vh'}
                bg='teal.500'
                rounded='s'
                shadow='md'
              >
                <Input
                  placeholder='Title'
                  color={'black'}
                  name='title'
                  value={formData.title}
                  bg='teal.100'
                  onChange={handleChange}
                />
                <Textarea
                  bg='teal.100'
                  placeholder='Review'
                  m='10px'
                  ml='0'
                  name='description'
                  value={formData.description}
                  onChange={handleChange}
                />
                <Heading size='l' mt='4' ml='-5'>
                  Rating
                </Heading>
                <Slider
                  name='rating'
                  min={0}
                  max={10}
                  step={0.5}
                  value={formData.rating}
                  onChangeEnd={(e) => setFormData(e)}
                >
                  <SliderMark
                    value={formData.rating}
                    textAlign='center'
                    borderRadius={10}
                    color='white'
                    mt='3.5'
                    ml='-5'
                    w='10'
                  >
                    {formData.rating}
                  </SliderMark>
                  <SliderTrack bg='white'>
                    <Box position='relative' right={10} />
                    <SliderFilledTrack bg='teal.100' />
                  </SliderTrack>
                  <SliderThumb boxSize={4} />
                </Slider>
              </Box>
            </Collapse> */}
          </GridItem>
        </Grid>
      </div>
    </div>
  );
};

export default Profile;
