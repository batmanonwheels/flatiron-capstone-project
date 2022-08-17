# require_relative '../../../../config/.spotify_key.rb'

class Api::V1::LoginController < ApplicationController

  def spotify_auth
    query_params ={
      response_type: "code",
      client_id: ENV["CLIENT_ID"],
      scope: "user-library-read user-top-read playlist-modify-public playlist-modify-private  user-read-currently-playing user-read-recently-played user-read-playback-state user-read-playback-position user-library-read user-read-email user-read-private",
      redirect_uri: ENV["REDIRECT_URL"],
      show_dialog: false
    }

    url = "https://accounts.spotify.com/authorize?"

    redirect_to "#{url}#{query_params.to_query}"
  end

  def show
      render json: current_user, status: :ok
  end
end
