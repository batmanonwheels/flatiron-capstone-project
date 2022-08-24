class UserSerializer < ActiveModel::Serializer
  attributes :id, :full_name, :username, :email, :profile_pic, :spotify_url, :country, :href, :uri, :total_followers
  has_many :reviews
  has_many :favorites
  has_many :tracks, through: :favorites
  has_many :likes
  has_many :comments

end
