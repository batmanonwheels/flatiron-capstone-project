class UserSerializer < ActiveModel::Serializer
  attributes :id, :full_name, :username, :profile_pic, :spotify_url, :country, :uri, :total_followers,
end
