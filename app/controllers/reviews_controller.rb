class ReviewsController < ApplicationController
  before_action :find_review, only: [:show, :update, :destroy]
  def index
    render json: Review.all, include: "*.*", status: :ok
  end

  def show
    render json: @review, status: :ok
  end

  def create
    review = Review.create(review_params)
    render json: review, status: :created
  end

  def update
    # byebug
    @review.update!(update_params)
    render json: @review, status: :accepted
  end

  def destroy
    @review.destroy
    head :no_content
  end

  private

  def find_review
    @review = Review.find(params[:id])
  end

  def update_params
    params.permit(:title, :description, :rating)
  end
  def review_params
    params.permit(:id, :title, :description, :rating, :track_id, :user_id, :review)
  end
end

