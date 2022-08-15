class UsersController < ApplicationController
  # before_action :authorize, only: [:show]

  # def create
  #   user = User.create(user_params)
  #   if user.valid?
  #     session[:user_id] = user.id
  #     render json: user, status: :created
  #   else
  #     render json: { error: user.errors.full_messages }, status: :unprocessable_entity
  #   end
  # end


  def show
    user = User.find_by(id: session[:user_id])
    render json: user
  end

  def create
    user = User.create!(user_params)
    session[:user_id] = user.id
    render json: user, status: :created
  end

  def update
    user = User.update!(user_params)
    render json: user, status: :accepted
  end

  # def spotify
  #   spotify_user = RSpotify::User.new(request.env['omniauth.auth'])
  #   # Now you can access user's private data, create playlists and much more

  #   # Access private data
  #   spotify_user.country #=> "US"
  #   spotify_user.email   #=> "example@email.com"

  #   # Create playlist in user's Spotify account
  #   playlist = spotify_user.create_playlist!('my-awesome-playlist')

  #   # Add tracks to a playlist in user's Spotify account
  #   tracks = RSpotify::Track.search('Know')
  #   playlist.add_tracks!(tracks)
  #   playlist.tracks.first.name #=> "Somebody That I Used To Know"

  #   # Access and modify user's music library
  #   spotify_user.save_tracks!(tracks)
  #   spotify_user.saved_tracks.size #=> 20
  #   spotify_user.remove_tracks!(tracks)

  #   albums = RSpotify::Album.search('launeddas')
  #   spotify_user.save_albums!(albums)
  #   spotify_user.saved_albums.size #=> 10
  #   spotify_user.remove_albums!(albums)

  #   # Use Spotify Follow features
  #   spotify_user.follow(playlist)
  #   spotify_user.follows?(artists)
  #   spotify_user.unfollow(users)

  #   # Get user's top played artists and tracks
  #   spotify_user.top_artists #=> (Artist array)
  #   spotify_user.top_tracks(time_range: 'short_term') #=> (Track array)

  #   # Check doc for more
  # end


  # def self.top_tracks
  #   RSpotify::User.top_tracks(params[:q])
  # end

  private

  def user_params
    params.permit(:full_name, :username, :email, :profile_pic, :spotify_url, :country, :href, :uri, :total_followers, :access_token, :refresh_token)
  end

end
