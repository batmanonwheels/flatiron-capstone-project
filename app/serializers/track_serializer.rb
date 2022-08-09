class TrackSerializer < ActiveModel::Serializer
  attributes :id, :name, :artist, :album, :image, :preview, :spotify_id
end
