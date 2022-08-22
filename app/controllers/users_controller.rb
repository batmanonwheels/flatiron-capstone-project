class UsersController < ApplicationController
  # before_action :refresh_token, only: []
  before_action :find_user, only: [:top, :recent]

  def show
    user = User.find_by(username: session[:current_user_username])
    puts "Rendered user"
    render json: user, serializer: UserSerializer, status: :ok
  end

  def create
    if params[:error]
      puts 'Error Logging In', params

      redirect_to "http://localhost:4000/"
    else
      encoded = Base64.strict_encode64(ENV["CLIENT_ID"] + ":" + ENV["CLIENT_SECRET"]).to_s

      payload = {
        grant_type: "authorization_code",
        code: params[:code],
        redirect_uri: ENV["REDIRECT_URL"]
      }

      auth_response = Faraday.post("https://accounts.spotify.com/api/token", payload, {"Authorization" => "Basic #{encoded}"})

      auth_token = JSON.parse(auth_response.body, symbolize_names: true)[:access_token]
      ref_token = JSON.parse(auth_response.body, symbolize_names: true)[:refresh_token]

      user_response = Faraday.get("https://api.spotify.com/v1/me", {}, {"Authorization" => "Bearer #{auth_token}"})

      user_params = JSON.parse(user_response.body)

      @user = User.find_or_create_by(
        full_name: user_params["display_name"],
        username: user_params["id"],
        profile_pic: user_params["images"][0]["url"],
        email: user_params["email"],
        spotify_url: user_params["external_urls"]["spotify"],
        country: user_params["country"],
        href: user_params["href"],
        uri: user_params["uri"],
        total_followers: user_params["followers"]["total"]
        )

      @user.update(
        profile_pic: user_params["images"][0]["url"],
        total_followers: user_params["followers"]["total"],
        access_token: auth_token,
        refresh_token: ref_token)

      session[:current_user_username] = @user.username

      redirect_to 'http://localhost:4000/'
    end
  end

  def update
    user = User.update!(user_params)
    render json: user, serializer: UserSerializer, status: :accepted
  end

  private

  def user_params
    params.permit(:full_name, :username, :email, :profile_pic, :spotify_url, :country, :href, :uri, :total_followers, :access_token, :refresh_token)
  end

end
