import React from 'react';
import {
  Box,
  Image,
  Link,
  SimpleGrid,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
} from '@chakra-ui/react';
import { useToast, useDisclosure } from '@chakra-ui/react';
import { useState, useContext } from 'react';
import ReviewForm from './ReviewForm';
import UserContext from '../context/user';

const useForceUpdate = () => {
  const set = useState(false)[1];
  return () => set((s) => !s);
};

const FavoriteCard = ({ track }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user, setUser } = useContext(UserContext);
  const toast = useToast();

  const forceUpdate = useForceUpdate();
  const handleDeleteFavClick = (e) => {
    e.preventDefault();
    fetch(`/api/favorites/${track.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    forceUpdate();
    toast({
      title: `Removing track from favorites`,
      position: 'bottom-right',
      variant: 'subtle',
      status: 'success',
      duration: 4500,
      isClosable: true,
    });
  };

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
            onClick={(e) => handleDeleteFavClick(e)}
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
      </Box>
      <Modal isOpen={isOpen} onClose={onClose} track={track}>
        <ModalOverlay bg='none' backdropFilter='auto' backdropBlur='8px' />
        <ModalContent>
          <ModalCloseButton />
          <ReviewForm track={track} user={user} onClose={onClose} />
        </ModalContent>
      </Modal>
    </>
  );
};
export default FavoriteCard;
