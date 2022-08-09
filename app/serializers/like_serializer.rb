class LikeSerializer < ActiveModel::Serializer
  attributes :id
  has_one :review
  has_one :user
end
