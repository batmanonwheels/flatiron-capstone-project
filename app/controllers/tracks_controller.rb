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
    # time_range = params[:time_range] || "medium_term"
    top_tracks = SpotifyApiAdapter.get_user_top_tracks(@current_user)
    puts "Rendered top tracks"
    render json: top_tracks, status: :ok
  end

  def recent
    recent_track_data = SpotifyApiAdapter.get_user_recent_tracks(@current_user)
    # byebug
    if !recent_track_data["error"]
      puts "Rendered recent tracks"
      render json: recent_track_data, status: :ok
    end
  end

  def self.recent_track_time_analysis(items)
    elapsed_t_seconds = Time.parse(items.first["played_at"]) - Time.parse(items.last["played_at"])
    elapsed_t_hours = elapsed_t_seconds/3600.0
    # Get time in full hours
    elapsed_hours = elapsed_t_hours.truncate
    # Get time in full minutes
    elapsed_minutes = (elapsed_t_hours%1) * 60
    # Get tracks played per hour
    tracks_per_hour = items.length.to_f / elapsed_t_hours
    {hours: elapsed_hours, minutes: elapsed_minutes, per_hour: tracks_per_hour}
  end

  private
    def self.group_recent_tracks(tracks)
      # Create an array of hashes, each hash containing a key for a date and
      # and hour, an array of tracks played at that time, and the total track count;
      # Reverse array so that it is in ascending order by time
      previous_date_and_hour = nil
      tracks.each_with_object([]) do |track, arr|
        date_and_hour = track["played_at"].to_datetime.strftime("%Y-%m-%dT%H")
        if date_and_hour == previous_date_and_hour
          # add track to beginning of array, so they are in ascending order
          arr.last[:tracks].unshift(track)
          arr.last[:count] += 1
        else
          arr << {time: date_and_hour, tracks: [track], count: 1}
          previous_date_and_hour = date_and_hour
        end
      end.reverse
    end

    def find_user
      @current_user = User.find_by(username: session[:current_user_username])
    end

    def find_track
      @track = Track.find(params[:id])
    end
end
