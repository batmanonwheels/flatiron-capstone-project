import React, { useState } from 'react';
import {
  GridItem,
  Image,
  LinkBox,
  Link,
  SimpleGrid,
  Box,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
} from '@chakra-ui/react';
import { Center, useDisclosure } from '@chakra-ui/react';
import AlbumDetails from './AlbumDetails';

const AlbumCard = ({
  spotifyLink,
  coverArt,
  title,
  artist,
  album,
  albumType,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Center>
        <GridItem w='100%' h='100%'>
          {/* <div className='track'> */}
          <LinkBox
            as='article'
            p='5'
            borderWidth='1.5px'
            rounded='md'
            _hover={{ transform: 'scale(1.01)' }}
          >
            <Link href={spotifyLink} zIndex='4'>
              <Image
                src={coverArt}
                boxSize='100%'
                fallbackSrc='https://giphy.com/embed/3oEjI6SIIHBdRxXI40'
                alt={title}
                sx={{ borderRadius: '4px' }}
              />
            </Link>
            <SimpleGrid
              columns={1}
              marginTop='10px'
              marginBottom='10px'
              position='relative'
            >
              <Box width='auto'>
                <h3 className='track-title'>{title}</h3>
                <h4 className='track-artist'>{artist}</h4>
              </Box>
            </SimpleGrid>
            <Box width='auto'>
              <Button
                // loadingText='See you soon!'
                onClick={onOpen}
                colorScheme='teal'
                className='track-button'
                zIndex='5'
                sx={{ position: 'absolute', bottom: '0', right: '0' }}
              >
                View Tracks
              </Button>
            </Box>
          </LinkBox>
        </GridItem>
      </Center>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay bg='none' backdropFilter='auto' backdropBlur='8px' />
        <ModalContent maxW='80rem' maxH='fit-content'>
          <ModalCloseButton />
          <AlbumDetails
            tracks={album.tracks}
            albumName={album.name}
            cover={album.images[1].url}
            onClose={onClose}
          />
        </ModalContent>
      </Modal>
    </>
  );
};

export default AlbumCard;
