class FavoriteSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :track_id
  has_one :user
  has_one :track
end
