import React from 'react';
import TrackCard from './TrackCard';
import { Grid, Progress } from '@chakra-ui/react';

function TrackList({ user, tracks, setRecentTracks }) {
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
      .then((data) => setRecentTracks([...data]));
  };

  const onFavoriteClick = (track) => {
    setRecentTracks((current) =>
      current.filter((favTrack) => {
        return favTrack.name !== track.name;
      })
    );
  };

  return (
    <div className='track-list'>
      <Grid templateColumns='repeat(3, 1fr)' gap={4} padding={1}>
        {tracks ? (
          tracks.items.map((item) => (
            <TrackCard
              key={item.id}
              track={item.track}
              spotifyLink={item.track.uri}
              coverArt={item.track.album.images[1].url}
              title={item.track.name}
              album={item.track.album.name}
              albumType={item.track.album.album_type}
              preview={item.track.preview_url}
              artist={item.track.artists[0].name}
              handleFavorite={handleFavorite}
              onFavoriteClick={onFavoriteClick}
            />
          ))
        ) : (
          <Progress size='md' w='145vh' colorScheme='teal' isIndeterminate />
        )}
      </Grid>
    </div>
  );
}

export default TrackList;
