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
  Text,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
} from '@chakra-ui/react';
import { Center, useDisclosure } from '@chakra-ui/react';
import AlbumDetails from './AlbumDetails';
import TrackList from './TrackList';

const AlbumCard = ({
  spotifyLink,
  coverArt,
  title,
  artist,
  album,
  releaseDate,
  albumType,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  console.log(album.tracks.items);
  return (
    <>
      <Center>
        <GridItem w='29vw' h='63vh'>
          <div className='album'>
            <LinkBox
              as='article'
              p='1.75'
              borderWidth='1px'
              rounded='md'
              _hover={{ transform: 'scale(1.008)' }}
            >
              <Link href={spotifyLink} zIndex='4'>
                <Image
                  src={coverArt}
                  boxSize='100%'
                  alt={title}
                  sx={{ borderRadius: '4px' }}
                />
              </Link>
              <SimpleGrid
                columns={2}
                marginTop='.5vh'
                marginBottom='1vh'
                position='relative'
                minH={'8.5vh'}
              >
                <Box top={0} left={0}>
                  <Text fontSize='1.8vh' w={'36vw'} className='track-title'>
                    {title}
                  </Text>
                  <Text fontSize='1.8vh' w={'18vw'} className='track-artist'>
                    {artist}
                  </Text>
                  <Text fontSize='1.8vh' w={'18vw'} className='track-artist'>
                    {releaseDate.split('-')[0]}
                  </Text>
                </Box>
              </SimpleGrid>
              <Box w={'15vw'}>
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
          </div>
        </GridItem>
      </Center>
      <Modal isOpen={isOpen} onClose={onClose} maxH={'60vh'}>
        <ModalOverlay bg='none' backdropFilter='auto' backdropBlur='8px' />
        <ModalContent maxW='fit-content' maxH='60vh'>
          <ModalCloseButton />
          <AlbumDetails
            tracks={album.tracks.items}
            album={album}
            albumName={album.name}
            cover={album.images[1].url}
            artist={album.artists[0].name}
            onClose={onClose}
          />
        </ModalContent>
      </Modal>
    </>
  );
};

export default AlbumCard;
