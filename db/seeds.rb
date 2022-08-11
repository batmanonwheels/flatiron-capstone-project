tracks = RSpotify::Playlist.find("spotify","37i9dQZF1DX0kbJZpiYdZl").tracks

tracks.map do |track|
  Track.create(
    name: track.name,
    artist: track.album.artists[0].name,
    album: track.album.name,
    image: track.album.images[0]['url'],
    preview: track.preview_url,
    spotify_uri: track.uri
  )
end

