class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :rating
  has_one :track
  has_one :user
end
