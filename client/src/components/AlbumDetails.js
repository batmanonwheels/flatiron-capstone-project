import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Progress, ModalHeader, ModalBody } from '@chakra-ui/react';
import UserContext from '../context/user';

import TrackCard from './TrackCard';

const AlbumDetails = ({ tracks, albumName, cover, setAlbums }) => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
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
  return (
    <>
      <ModalHeader>{albumName}'s tracklist</ModalHeader>
      <ModalBody>
        <Grid
          templateColumns='repeat(3, 1fr)'
          templateRows='repeat(4, 1fr)'
          gap={4}
          padding={4}
        >
          {tracks ? (
            tracks.items.map((track) => (
              <TrackCard
                key={track.id}
                track={track}
                spotifyLink={track.uri}
                coverArt={cover}
                title={track.name}
                album={albumName}
                albumType={track.type}
                preview={track.preview_url}
                artist={track.artists[0].name}
                handleFavorite={handleFavorite}
              />
            ))
          ) : (
            <Progress size='md' w='300%' colorScheme='teal' isIndeterminate />
          )}
        </Grid>
      </ModalBody>
      {/* <ModalFooter></ModalFooter> */}
    </>
  );
};
export default AlbumDetails;
