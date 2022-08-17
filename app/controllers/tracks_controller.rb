class TracksController < ApplicationController
  before_action :find_track, only: :show
  before_action :find_user, only: [:top, :recent]

  def index
    render json: Track.all, status: :ok
  end

  def show
      render json: @track, status: :ok
  end

  def top
    time_range = params[:time_range] || "medium_term"
    top_tracks = SpotifyApiAdapter.get_user_top_tracks(@current_user)
    render json: top_tracks, status: :ok
  end

  def recent
    recent_track_data = SpotifyApiAdapter.get_user_recent_tracks(@current_user)
    # byebug
    if !recent_track_data["error"]
    render json: recent_track_data, status: :ok
    end
  end

  private
  def find_user
    @current_user = User.find_by(username: session[:current_user_username])
  end

  def find_track
    @track = Track.find(params[:id])
  end
end
