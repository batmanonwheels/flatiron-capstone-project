class AlbumsController < ApplicationController
  before_action :find_user, only: :saved

  def create
    @track = Track.find_or_create_by(
        name: params['track']['name'],
        artist: params['track']['artists'][0]['name'],
        album: params['album'],
        image: params['image'],
        preview: params['track']['preview_url'],
        spotify_uri: params['track']['uri']
        )
    favorite = Favorite.find_or_create_by(user_id: params['user_id'], track_id: @track.id)
    render json: favorite, status: :created
  end

  def saved
    saved_album_data = SpotifyApiAdapter.get_user_saved_albums(@current_user)
    if !saved_album_data["error"]
      puts "Rendered recent tracks"
      render json: saved_album_data, status: :ok
    end
  end

  private
  def find_user
    @current_user = User.find_by(username: session[:current_user_username])
  end

end
