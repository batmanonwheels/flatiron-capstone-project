class TracksController < ApplicationController
  before_action :find_track, only: :show

  def index
    render json: Track.all, status: :ok
  end

  def show
      render json: @track, status: :ok
  end

  private

  def find_track
    @track = Track.find(params[:id])
  end
end
