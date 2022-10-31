import React, { useState } from 'react';
import {
  GridItem,
  Image,
  Button,
  LinkBox,
  Link,
  SimpleGrid,
  Box,
  Text,
} from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';
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
  onFavoriteClick,
}) => {
  const [buttonText, setButtonText] = useState('Add To Favorites  ');
  const [buttonColor, setButtonColor] = useState('teal');
  const toast = useToast();
  const [isFavorite, setIsFavorite] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
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
    setIsFavorite(!isFavorite);
    onFavoriteClick(track);
  };

  return (
    <Center>
      {coverArt ? (
        <GridItem w='29vw' h='63vh'>
          <div className='track'>
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
                  {
                    albumType === 'album' ? (
                      <Text fontSize='1.8vh' w={'18vw'} className='track-album'>
                        {album}{' '}
                      </Text>
                    ) : null
                    // <h4 className='track-album'>(single)</h4>
                  }
                  <Text fontSize='1.8vh' w={'18vw'} className='track-artist'>
                    {artist}
                  </Text>
                </Box>
                <Box w={'15vw'} pt={10} bottom={0} right={0}>
                  <Button
                    colorScheme='teal'
                    onClick={(e) => handleClick(e, track)}
                    className='track-button'
                    zIndex='5'
                    mt={50}
                    sx={{ position: 'absolute', bottom: '0', right: '0' }}
                    fontSize='1.7vh'
                    maxW={'45%'}
                  >
                    <StarIcon w={10} />
                    {!isFavorite ? 'Add To Favorites' : 'Favorited!'}
                  </Button>
                </Box>
              </SimpleGrid>
              <ReactPlayer
                // playing
                url={preview}
                height='25px'
                controls={true}
                width='100%'
                zIndex='5'
              />
            </LinkBox>
          </div>
        </GridItem>
      ) : (
        <GridItem w='29vw' h='25vh'>
          <div className='track'>
            <LinkBox
              as='article'
              p='1.75'
              borderWidth='1px'
              rounded='md'
              _hover={{ transform: 'scale(1.008)' }}
            >
              <SimpleGrid
                columns={2}
                marginTop='.5vh'
                marginBottom='1vh'
                position='relative'
                minH={'8.5vh'}
              >
                <Box top={0} left={0}>
                  <Link href={spotifyLink} zIndex='4'>
                    <Text fontSize='2vh' w={'36vw'} className='track-title'>
                      {title}
                    </Text>
                  </Link>
                  {
                    albumType === 'album' ? (
                      <Text fontSize='1.8vh' w={'18vw'} className='track-album'>
                        {album}{' '}
                      </Text>
                    ) : null
                    // <h4 className='track-album'>(single)</h4>
                  }
                  <Text fontSize='1.8vh' w={'18vw'} className='track-artist'>
                    {artist}
                  </Text>
                </Box>
                <Box w={'15vw'} pt={10} bottom={0} right={0}>
                  <Button
                    colorScheme='teal'
                    onClick={(e) => handleClick(e, track)}
                    className='track-button'
                    zIndex='5'
                    mt={50}
                    sx={{ position: 'absolute', bottom: '0', right: '0' }}
                    fontSize='1.7vh'
                    maxW={'45%'}
                  >
                    <StarIcon w={10} />
                    {!isFavorite ? 'Add To Favorites' : 'Favorited!'}
                  </Button>
                </Box>
              </SimpleGrid>
              <ReactPlayer
                // playing
                url={preview}
                height='25px'
                controls={true}
                width='100%'
                zIndex='5'
              />
            </LinkBox>
          </div>
        </GridItem>
      )}
    </Center>
  );
};

export default TrackCard;
