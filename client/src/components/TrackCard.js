import React, { useState } from 'react';
import {
  GridItem,
  Image,
  Button,
  LinkBox,
  Link,
  SimpleGrid,
  Box,
  LinkOverlay,
} from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react';
import { Center } from '@chakra-ui/react';
import ReactPlayer from 'react-player';

const TrackCard = ({
  handleFavorite,
  user,
  spotifyLink,
  coverArt,
  title,
  album,
  artist,
  track,
  preview,
  albumType,
  setRecentTracks,
}) => {
  const [buttonText, setButtonText] = useState('Add To Favorites');
  const [buttonColor, setButtonColor] = useState('teal');
  const toast = useToast();

  const handleClick = (e) => {
    // e.preventDefault();
    handleFavorite(track);
    setButtonText('Added to Favorites');
    setButtonColor('');
    toast({
      title: `${title} - ${artist}`,
      description: 'Added to Favorites!',
      position: 'bottom-right',
      variant: 'subtle',
      status: 'success',
      duration: 4500,
      isClosable: true,
    });
    setRecentTracks((current) =>
      current.filter((favTrack) => {
        return favTrack.name !== track.name;
      })
    );
  };

  return (
    <Center>
      <GridItem w='100%' h='100%'>
        <div className='track'>
          <LinkBox
            as='article'
            p='5'
            borderWidth='1.5px'
            rounded='md'
            // minH={'500px'}
            _hover={{ transform: 'scale(1.02)' }}
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
              columns={2}
              marginTop='10px'
              marginBottom='10px'
              position='relative'
            >
              <Box width='auto'>
                <h3 className='track-title'>{title}</h3>
                {albumType === 'album' ? (
                  <h4 className='track-album'>{album}</h4>
                ) : // <h4 className='track-album'>{album} (Single)</h4>
                null}
                <h4 className='track-artist'>{artist}</h4>
              </Box>
              <Box width='auto'>
                <Button
                  // loadingText='See you soon!'
                  colorScheme='teal'
                  onClick={(e) => handleClick(e, track)}
                  className='track-button'
                  marginBottom='7px'
                  zIndex='5'
                  sx={{ position: 'absolute', bottom: '0', right: '0' }}
                >
                  {buttonText}
                </Button>
              </Box>
            </SimpleGrid>
            <ReactPlayer
              // playing
              url={preview}
              height='45px'
              controls={true}
              width='100%'
              zIndex='5'
            />
          </LinkBox>
          {/* <button className='track-create-review-button'>Review</button> */}
        </div>
      </GridItem>
    </Center>
  );
};

export default TrackCard;
