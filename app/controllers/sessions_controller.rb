class SessionsController < ApplicationController

  def index
    render json: User.all, status: :ok
  end

  def show
    user = User.find_by(id: session[:user_id])
    render json: user, serializer: UserSerializer, status: :ok
  end

  def create
    user = User.find_by(username: params[:username])
    if user&.authenticate(params[:password])
      session[:user_id] = user.id
      render json: user, status: :created
    else
      render json: { error: "Invalid username or password" }, status: :unauthorized
    end
  end

  def destroy
    session.delete :user_id
    head :no_content
  end

end
