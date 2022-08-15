require_relative '../../../../config/.spotify_key.rb'

class Api::V1::LoginController < ApplicationController

  def index
    query_params ={
      response_type: "code",
      client_id: $client_id,
      scope: "user-library-read user-top-read playlist-modify-public playlist-modify-private  user-read-currently-playing user-read-playback-state user-read-email user-read-private",
      redirect_uri: 'http://localhost:3000/api/v1/login/callback',
      show_dialog: true
    }

    url = "https://accounts.spotify.com/authorize?"

    redirect_to "#{url}#{query_params.to_query}"
  end

  def create
    if params[:error]
      puts 'Error Logging In', params

      redirect_to "http://localhost:4000/"
    else
      encoded = Base64.strict_encode64($client_id + ":" + $client_secret).to_s

      payload = {
        grant_type: "authorization_code",
        code: params[:code],
        redirect_uri: 'http://localhost:3000/api/v1/login/callback',
      }

      auth_response = Faraday.post("https://accounts.spotify.com/api/token", payload, {"Authorization" => "Basic #{encoded}"})

      auth_token = JSON.parse(auth_response.body, symbolize_names: true)[:access_token]
      refresh_token = JSON.parse(auth_response.body, symbolize_names: true)[:refresh_token]

      user_response = Faraday.get("https://api.spotify.com/v1/me", {}, {"Authorization" => "Bearer #{auth_token}"})

      user_params = JSON.parse(user_response.body)

      @user = User.where(
        full_name: user_params["display_name"],
        username: user_params["id"],
        profile_pic: user_params["images"][0]["url"],
        email: user_params["email"],
        spotify_url: user_params["external_urls"]["spotify"],
        country: user_params["country"],
        href: user_params["href"],
        uri: user_params["uri"],
        total_followers: user_params["followers"]["total"]).first_or_create

      @user.update(
        access_token: auth_token,
        refresh_token: refresh_token)

      # User.update_all(logged_in: false)

      # @user.update(logged_in: true)

      ENV["CURRENT_USER_ID"] = @user.id.to_s

      ENV["SPOTIFY_USER_ID"] = @user.username

      render json: @user, status: :created

      redirect_to "http://localhost:4000"
    end
  end
end
