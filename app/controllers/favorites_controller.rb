class FavoritesController < ApplicationController
  before_action :find_favorite, only: [:show, :destroy]

  def index
    render json: Favorite.all, status: :ok
  end

  def show
    render json: @favorite, status: :ok
  end

  def create
    @track = Track.find_or_create_by(
        name: params['track']['name'],
        artist: params['track']['artists'][0]['name'],
        album: params['track']['album']['name'],
        image: params['track']['album']['images'][0]['url'],
        preview: params['track']['preview_url'],
        spotify_uri: params['track']['uri']
        )
    favorite = Favorite.find_or_create_by(user_id: params['user_id'], track_id: @track.id)
    render json: favorite, status: :created
  end

  def destroy
    @favorite.destroy
    head :no_content
  end

  private

  def find_favorite
    @favorite = Favorite.find((params[:id]))
  end

  def favorite_params
    params.require(:user_id, :track_id)
  end
end
