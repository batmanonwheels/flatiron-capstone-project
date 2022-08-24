class TrackSerializer < ActiveModel::Serializer
  attributes :id, :name, :artist, :album, :image, :preview, :spotify_uri
  has_many :reviews
  has_many :favorites
end
