class LikesController < ApplicationController
  before_action :find_like, only: [:show, :destroy]
  def index
    render json: Like.all, status: :ok
  end

  def show
    render json: @like, status: :ok
  end

  def create
    like = Like.create!(like_params)
    render json: like, status: :created
  end

  def update
    @like.update!(like_params)
    render json: @like, status: :accepted
  end

  def destroy
    @like.destroy
    head :no_content
  end

  private

  def find_like
    @like = Like.find((params[:id]))
  end

  def like_params
    params.permit(:user_id, :review_id, :like)
  end
end
