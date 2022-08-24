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
import { useEffect, useState, useContext } from 'react';
import ReviewForm from './ReviewForm';
import UserContext from '../context/user';

const FavoriteCard = ({ track, handleReviewClick, handleDeleteClick }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user, setUser } = useContext(UserContext);
  // const { isOpen, onToggle } = useDisclosure();

  return (
    <>
      <Box
        w='300px'
        h='100%'
        key={track.id}
        sx={{ borderRadius: '6px', padding: '2px' }}
        _hover={{
          transform: 'scale(1.05)',
        }}
      >
        <Link href={track.spotify_uri}>
          <Image
            src={track.image}
            fallbackSrc='https://giphy.com/embed/3oEjI6SIIHBdRxXI40'
            alt={track.title}
            position='relative'
          />
        </Link>
        <Box width='auto'>
          <Button
            colorScheme='teal'
            onClick={(e) => handleDeleteClick(e, track)}
            className='track-button'
            marginBottom='7px'
            sx={{ position: 'absolute', top: '0', right: '0' }}
          >
            X
          </Button>
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
        </Box>
        <SimpleGrid columns={1} marginTop='10px' marginBottom='10px'>
          <Box width='100%'>
            <h3 className='track-title'>{track.name}</h3>
            <h4 className='track-album'>{track.album}</h4>
            <h4 className='track-artist'>{track.artist}</h4>
          </Box>
        </SimpleGrid>
        {/* <Collapse in={isOpen} animateOpacity>
          <Box
            border='1px solid'
            p='40px'
            color='blackAlpha.900'
            mt='4'
            bg='teal.500'
            rounded='md'
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
      </Box>
      <Modal isOpen={isOpen} onClose={onClose} track={track}>
        <ModalOverlay
          bg='none'
          backdropFilter='auto'
          // backdropInvert='75%'
          backdropBlur='8px'
        />
        <ModalContent>
          <ModalCloseButton />
          <ReviewForm track={track} user={user} onClose={onClose} />
        </ModalContent>
      </Modal>
    </>
  );
};
export default FavoriteCard;
