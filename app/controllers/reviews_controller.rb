class ReviewsController < ApplicationController
  before_action :find_review, only: [:show, :destroy]
  def index
    render json: Review.all, status: :ok
  end

  def show
    render json: @review, status: :ok
  end

  def create
    review = Review.create!(review_params)
    render json: review, status: :created
  end

  def update
    @review.update!(review_params)
    render json: @review, status: :accepted
  end

  def destroy
    @review.destroy
    head :no_content
  end

  private

  def find_review
    @review = Review.find((params[:id]))
  end

  def review_params
    params.permit(:title, :description, :rating, :track_id, :user_id)
  end
end

