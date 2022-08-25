class CommentsController < ApplicationController
  before_action :find_comment, only: [:show, :update, :destroy]
  def index
    render json: Comment.all, status: :ok
  end

  def show
    render json: @comment,  status: :ok
  end

  def create
    comment = Comment.create!(comment_params)
    render json: comment, status: :created
  end

  def update
    @comment.update!(comment_params)
    render json: @comment, status: :accepted
  end

  def destroy
    @comment.destroy
    head :no_content
  end

  private

  def find_comment
    @comment = Comment.find((params[:id]))
  end

  def comment_params
    params.permit( :user_id, :review_id, :description)
  end
end
