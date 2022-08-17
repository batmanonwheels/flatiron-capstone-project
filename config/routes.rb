Rails.application.routes.draw do

  scope '/api' do
    # resources :tracks, only: [:index, :show, :create ]

    resources :comments, only: [:index, :show, :create, :update, :destroy ]

    resources :likes, only: [:index, :show, :create, :destroy ]

    resources :reviews, only: [:index, :show, :create, :update, :destroy ]

    resources :favorites, only: [:index, :show, :create, :destroy ]
  end

  get '/api/v1/login', to: 'api/v1/login#spotify_auth'

  get '/auth/spotify/callback', to: 'users#create'
  get '/api/myaccount', to: 'users#show'

  get "/api/tracks/top", to: "tracks#top"
  get "/api/tracks/recent", to: "tracks#recent"

  delete "api/logout", to: "sessions#destroy"


  # namespace :api do
  #   namespace :v1 do
  #     get '/login', to: "login#index"
  #     get '/auth', to: "auth#show"
  #     get '/user', to: "users#create"
  #   end
  # end

end
