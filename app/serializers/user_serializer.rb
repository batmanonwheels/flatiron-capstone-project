class UserSerializer < ActiveModel::Serializer
  attributes :id, :full_name, :username, :email, :profile_pic, :spotify_url, :country, :href, :uri, :total_followers, :access_token, :refresh_token
end
