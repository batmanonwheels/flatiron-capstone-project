class CommentSerializer < ActiveModel::Serializer
  attributes :id, :description
  has_one :review
  has_one :user

  # def user_name
  #   object.user.name
  # end

  # def review_name
  #   self.object.review.title
  # end

  # def track_image
  #   self.object.review.track.image
  # end

  # def track_name
  #   self.object.review.track.name
  # end

end
