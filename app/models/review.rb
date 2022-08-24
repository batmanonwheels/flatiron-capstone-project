class Review < ApplicationRecord
  belongs_to :track
  belongs_to :user
  has_many :comments, dependent: :destroy
  has_many :likes, dependent: :destroy
end
