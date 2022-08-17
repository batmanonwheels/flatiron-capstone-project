class Track < ApplicationRecord
  has_many :reviews, dependent: :destroy
  has_many :favorites, dependent: :destroy
  has_many :users, through: :reviews
  has_many :users, through: :favorites

  validates :spotify_uri, uniqueness: true
  validates :name, presence: true

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

  def self.from_json(json)
    assignment_hash = {
      name: json["name"],
      duration_ms: json["duration_ms"],
      explicit: json["explicit"],
      spotify_url: json["external_urls"]["spotify"],
      href: json["href"],
      spotify_id: json["id"],
      preview_url: json["preview_url"],
      uri: json["uri"]
    }
    Track.find_or_create_by(assignment_hash)
  end



end
