class TrackSerializer < ActiveModel::Serializer
  attributes :id, :name, :artist, :album, :image, :preview, :spotify_uri
end
