class User < ApplicationRecord
  has_many :reviews
  has_many :favorites
  has_many :likes
  has_many :comments
  has_many :users, through: :comments
  has_many :users, through: :likes
  has_many :tracks, through: :reviews
  has_many :tracks, through: :favorites
end
