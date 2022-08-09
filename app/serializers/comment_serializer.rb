class CommentSerializer < ActiveModel::Serializer
  attributes :id, :description
  has_one :review
  has_one :user
end
