class Api::V1::TracksController < ApplicationController
  def index
    render json: Track.all, status: :ok
  end

  def top_100
    s_tracks = RSpotify::Playlist.find("1276640268","2kpoUUJ5a4Cw3feTkFJhZ2").tracks
    @tracks = s_tracks.map do |s_track|
      Track.new_track(s_track)
    end
    render json: @tracks
  end

  def search
    search_results = RSpotify::Track.search(params[:q])
    @tracks = search.map do |search_track|
      Track.new_track(s_track)
    end
    render json: @tracks
  end

  def random
    s_tracks = RSpotify::Playlist.browse_featured.first.tracks
    @tracks = s_tracks.map do |s_track|
      Track.new_track(s_track)
    end
    render json: @tracks
    end

end
