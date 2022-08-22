class SessionsController < ApplicationController

  def index
    render json: User.all, status: :ok
  end

  def show
    user = User.find_by(id: params[:user_id])
    render json: user, serializer: UserSerializer, status: :ok
  end

  def create
    user = User.find_by(id: session[:user_id])
    if user
      session[:user_id] = user.id
      render json: user, status: :ok
    end
  end

  def destroy
    session[:current_user_username].delete
    head :no_content
  end

end
