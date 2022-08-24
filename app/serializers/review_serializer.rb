class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :rating
  belongs_to :track
  belongs_to :user
  has_many :comments
  has_many :likes
end
