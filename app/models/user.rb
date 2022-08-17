class User < ApplicationRecord
  has_many :reviews, dependent: :destroy
  has_many :favorites, dependent: :destroy
  has_many :likes, dependent: :destroy
  has_many :comments, dependent: :destroy
  has_many :users, through: :comments
  has_many :users, through: :likes
  has_many :tracks, through: :reviews
  has_many :tracks, through: :favorites

  validates :username, uniqueness: true
  validates :email, uniqueness: true

  def access_token_expired?
    (Time.now - self.updated_at) > 3300
  end

  def refresh_auth_token
    # user = User.find_by(username: session[:current_user_username])

    if self.access_token_expired?

      encoded = Base64.strict_encode64(ENV["CLIENT_ID"] + ":" + ENV["CLIENT_SECRET"]).to_s

      payload = {
        grant_type: "refresh_token",
        refresh_token: self.refresh_token,
        client_id: ENV["CLIENT_ID"],
        client_secret: ENV["CLIENT_SECRET"]
      }

      auth_response = Faraday.post("https://accounts.spotify.com/api/token", payload,{"Authorization" => "Basic #{encoded}"})


      auth_token = JSON.parse(auth_response.body, symbolize_names: true)[:access_token]

      self.update(
        access_token: auth_token
      )
    end
  end
end
