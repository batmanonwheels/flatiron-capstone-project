import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Grid,
  Progress,
  ModalHeader,
  ModalBody,
  Image,
  Box,
  SimpleGrid,
  GridItem,
  Divider,
  Text,
  List,
  ListItem,
  ListIcon,
  useToast,
  Button,
  Link,
} from '@chakra-ui/react';
import {
  StarIcon,
  CalendarIcon,
  ExternalLinkIcon,
  InfoIcon,
} from '@chakra-ui/icons';
import UserContext from '../context/user';

import TrackCard from './TrackCard';

const AlbumDetails = ({
  tracks,
  album,
  artist,
  albumName,
  cover,
  setAlbums,
}) => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [buttonText, setButtonText] = useState('Add To Favorites  ');
  const [buttonColor, setButtonColor] = useState('teal');
  const toast = useToast();
  const [isFavorite, setIsFavorite] = useState(false);
  const handleFavorite = (track) => {
    console.log('Creating/Finding track in DB');
    const favoriteObj = {
      track: track,
      album: albumName,
      image: cover,
      user_id: user.id,
    };
    console.log(`Tracks name is ${track.title}`);
    fetch('/api/albums/savetrack', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(favoriteObj),
    })
      .then((r) => r.json())
      .then((data) => setAlbums([...data]));
    // navigate(`/me`);
  };
  const handleClick = (e, track) => {
    e.preventDefault();
    // handleFavorite(track);
    setButtonText('Added to Favorites');
    setButtonColor('');
    toast({
      title: `${track.name} - ${artist}`,
      description: 'Added to Favorites!',
      position: 'bottom-right',
      variant: 'subtle',
      status: 'success',
      duration: 4500,
      isClosable: true,
    });
    setIsFavorite(!isFavorite);
  };

  console.log(album);
  return (
    <>
      <ModalHeader>
        {albumName} by {artist}
      </ModalHeader>
      <ModalBody>
        <Grid
          templateColumns='repeat(3, 1fr)'
          templateRows='repeat(1, 1fr)'
          gap={4}
          padding={1}
        >
          <GridItem colSpan={1}>
            <Image
              src={cover}
              borderRadius={'3px'}
              alt={albumName}
              h={'50vh'}
              w={'auto'}
            ></Image>
          </GridItem>
          <GridItem colSpan={1}>
            <ModalHeader pl={0} pt={0} mt={0}>
              Tracklist
            </ModalHeader>
            <List overflowY={'scroll'} maxH={'44.5vh'}>
              {tracks.map((track) => (
                <>
                  <SimpleGrid
                    templateColumns='repeat(2, 1fr)'
                    templateRows='repeat(1, 1fr)'
                    gap={4}
                    padding={1}
                  >
                    <Box height='40px'>{track.name}</Box>

                    <Button
                      colorScheme='teal'
                      onClick={(e) => handleClick(e, track)}
                      className='track-button'
                      // sx={{ position: 'absolute', right: '0' }}
                      fontSize='1.7vh'
                      maxW={'45%'}
                    >
                      <StarIcon w={10} />
                      {!isFavorite ? 'Add To Favorites' : 'Favorited!'}
                    </Button>
                  </SimpleGrid>
                  <Divider orientation='horizontal' />
                </>
              ))}
            </List>
          </GridItem>
          <GridItem colSpan={1}>
            <ModalHeader pl={0} pt={0} mt={0}>
              Album Details
            </ModalHeader>
            <List spacing={3}>
              <ListItem>
                <ListIcon as={ExternalLinkIcon} color='green.500' />
                <Link href={album.uri}>Open in Spotify</Link>
              </ListItem>
              <ListItem>
                <ListIcon as={InfoIcon} color='green.500' />
                {album.label}
              </ListItem>
              <ListItem>
                <ListIcon as={CalendarIcon} color='green.500' /> Released on
                {' ' +
                  Date(album.release_date).split(' ')[1] +
                  ' ' +
                  Date(album.release_date).split(' ')[2] +
                  ' ' +
                  Date(album.release_date).split(' ')[3]}
              </ListItem>
            </List>
          </GridItem>
        </Grid>
      </ModalBody>
      {/* <ModalFooter></ModalFooter> */}
    </>
  );
};
export default AlbumDetails;
