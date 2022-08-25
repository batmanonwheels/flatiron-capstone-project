import React from 'react';
import AlbumCard from './AlbumCard';
import { Grid, Progress } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const AlbumList = ({ user, albums, setAlbums }) => {
  const navigate = useNavigate();
  const handleFavorite = (track) => {
    console.log('Creating/Finding track in DB');
    const favoriteObj = {
      track: track,
      user_id: user.id,
    };
    console.log(`Tracks name is ${track.title}`);
    fetch('/api/favorites', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(favoriteObj),
    })
      .then((r) => r.json())
      .then((data) => setAlbums([...data]));
    navigate(`/me`);
  };
  return (
    <div className='track-list'>
      <Grid
        templateColumns='repeat(3, 1fr)'
        templateRows='repeat(3, 1fr)'
        gap={3}
        padding={2}
      >
        {albums ? (
          albums.items.map((item) => (
            <AlbumCard
              key={item.id}
              album={item.album}
              coverArt={item.album.images[1].url}
              title={item.album.name}
              albumType={item.album.type}
              spotifyLink={item.album.uri}
              artist={item.album.artists[0].name}
            />
          ))
        ) : (
          <Progress size='md' w='145vh' colorScheme='teal' isIndeterminate />
        )}
      </Grid>
    </div>
  );
};

export default AlbumList;
