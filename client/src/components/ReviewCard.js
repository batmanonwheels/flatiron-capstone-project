import React from 'react';
import {
  Box,
  Image,
  Link,
  // Text,
  // LinkOverlay,
  SimpleGrid,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  // ModalHeader,
  // ModalFooter,
  // ModalBody,
  ModalCloseButton,
  // Collapse,
  // SliderTrack,
  // SliderMark,
  // Slider,
  // SliderThumb,
  // SliderFilledTrack,
  // Heading,
  // Textarea,
  // Input,
} from '@chakra-ui/react';
import { useToast, useDisclosure } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import ReviewForm from './ReviewForm';

const ReviewCard = ({ user, review, handleReviewClick, handleDeleteClick }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  // const { isOpen, onToggle } = useDisclosure();

  return (
    <>
      <Box
        w='300px'
        h='100%'
        key={review.id}
        sx={{ borderRadius: '6px', padding: '2px' }}
        _hover={{
          transform: 'scale(1.05)',
          // borderRadius: '0 3px 3px 0',
        }}
      >
        {/* <Link href={track.spotify_uri}>
          <Image
            src={track.image}
            // boxSize='100%'
            fallbackSrc='https://giphy.com/embed/3oEjI6SIIHBdRxXI40'
            alt={track.title}
            position='relative'
          />
        </Link> */}
        <Box width='auto'>
          <Button
            // loadingText='See you soon!'
            colorScheme='teal'
            onClick={(e) => handleDeleteClick(e, review)}
            className='track-button'
            marginBottom='7px'
            // zIndex={1000}
            sx={{ position: 'absolute', top: '0', right: '0' }}
          >
            X
          </Button>
          {/* <LinkOverlay
            to={{
              pathname: `/review-form`,
              state: {
                track: track,
                user: user,
              },
            }}
          > */}
          <Button
            colorScheme='teal'
            className='track-button'
            marginBottom='7px'
            onClick={onOpen}
            sx={{
              position: 'absolute',
              bottom: '-2',
              right: '0',
            }}
          >
            Create Review
          </Button>
          {/* </LinkOverlay> */}
        </Box>
        <SimpleGrid columns={1} marginTop='10px' marginBottom='10px'>
          <Box width='100%'>
            <h3 className='track-title'>{review.title}</h3>
            <h4 className='track-album'>{review.rating}</h4>
          </Box>
        </SimpleGrid>
      </Box>
    </>
  );
};
export default ReviewCard;
