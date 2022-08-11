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

  def create
    # if params[:error]
    #   puts 'LOGIN ERROR', params

    #   redirect_to ""
    # else
    #   body = {
    #     grant_type: "authorization_code",
    #     code: params[:code],
    #     redirect_uri: '',
    #     client_id: '',
    #     client_secret: ''
    #   }
    #   auth_response = RestClient.post('https://accounts.spotify.com/api/token', body)

    #   auth_params = JSON.parse(auth_response.body)

    #   header = {Authorization: "Bearer #{auth params ["access token"]}"}

    #   user_response = RestClient.get ("https://api.spotify.com/v1/me", header)

    #   user_params = JSON.parse(user_response.body)
    # end
  end

  def show
    user = User.find_by(id: session[:user_id])
    render json: user
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

  private

  # def authorize
  #   return render json: { error: "Not authorized" }, status: :unauthorized unless session.include? :user_id
  # end

  def user_params
    params.permit(:username, :password, :password_confirmation)
  end

end
