class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :rating
  belongs_to :track
  belongs_to :user
end
