import {
  Heading,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Button,
  ModalHeader,
  ModalFooter,
  ModalBody,
  FormHelperText,
  Textarea,
  Input,
  useToast,
  Image,
  HStack,
  GridItem,
  Text,
} from '@chakra-ui/react';
import React, { useState } from 'react';

const Review = ({
  title,
  description,
  id,
  rating,
  track,
  user,
  comments,
  likes,
  me,
}) => {
  const embedId = track.spotify_uri.split('spotify:track:')[1];

  return (
    <>
      <Image
        src={track.image}
        alt={track.title}
        width={'auto'}
        height={'600px'}
      />
      <iframe
        title={track.title}
        // style='border-radius:12px'
        src={`https://open.spotify.com/embed/track/${embedId}?utm_source=generator&theme=0`}
        width='100%'
        height='80'
        frameBorder='0'
        allowfullscreen=''
        allow='autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture'
        loading='lazy'
      ></iframe>
      <ModalHeader>
        <Heading>{title}</Heading>
      </ModalHeader>
      <ModalBody>
        <Text size={'md'}>{description}</Text>
      </ModalBody>
      <ModalFooter>
        <HStack>
          <GridItem>
            <Button fontSize='xl' className='review-rating' variant='ghost'>
              Like
            </Button>
          </GridItem>
          <GridItem>
            <Button fontSize='xl' className='review-rating' variant='ghost'>
              Comment
            </Button>
          </GridItem>
        </HStack>
      </ModalFooter>
    </>
  );
};
export default Review;
