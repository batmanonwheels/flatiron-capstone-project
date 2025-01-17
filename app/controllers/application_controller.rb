class ApplicationController < ActionController::API
rescue_from ActiveRecord::RecordInvalid, with: :render_invalid
rescue_from ActiveRecord::RecordNotFound, with: :render_not_found
    include ActionController::Cookies

    # skip_before_action :verify_authenticity_token
    # helper_method :current_user, :logged_in?

    # def current_user
    #     return nil unless session[:session_token]
    #     @current_user ||= User.find_by_session_token(session[:session_token])
    # end

    # def login(user)
    #     user.reset_session_token!
    #     session[:session_token] = user.session_token
    #     @current_user = user
    # end

    # def logout
    #     @current_user.reset_session_token!
    #     session[:session_token] = nil
    #     @current_user = nil

    # end

    # def logged_in?
    #     !!current_user
    # end

    # def require_login
    #     unless current_user
    #         render json: { base: ['invalid credentials'] }, status: 401
    #     end
    # end


    private

    def render_invalid(i)
        render json: {errors: i.record.errors.full_messages },status: :unprocessable_entity
    end

    def render_not_found(e)
        render json: {error: "#{e.model} Not Found"}, status: :not_found
    end
end
