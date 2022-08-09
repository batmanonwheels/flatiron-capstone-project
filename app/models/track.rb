class Track < ApplicationRecord

  def self.new_track(spotify_track)
    byebug
    Track.new(
      spotify_id: spotify_track.id,
      name: spotify_track.name,
      artists: spotify_track.artists[0].name,
      album: spotify_track.album[0],
      image: spotify_track.album.images[0]["url"],
      preview: spotify_track.preview_url
    )
  end

end
