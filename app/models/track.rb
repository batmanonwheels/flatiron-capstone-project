class Track < ApplicationRecord
  has_many :reviews
  has_many :favorites
  has_many :users, through: :reviews
  has_many :users, through: :favorites

  def self.new_track(track)
    Track.new(
      name: track.name,
      artist: track.album.artists[0].name,
      album: track.album.name,
      image: track.album.images[0]['url'],
      preview: track.preview_url,
      spotify_uri: track.uri
    )
  end


end
