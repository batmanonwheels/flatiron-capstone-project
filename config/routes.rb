Rails.application.routes.draw do

  scope '/api' do
    # resources :tracks, only: [:index, :show, :create ]
    resources :comments
    resources :likes, only: [:index, :show, :create, :destroy ]
    resources :reviews
    resources :favorites, only: [:index, :show, :create, :destroy ]
  end

  get '/api/v1/login', to: 'api/v1/login#spotify_auth'

  get '/api/me', to: 'users#show'
  get '/auth/spotify/callback', to: 'users#create'

  delete '/logout', to: 'sessions#destroy'

  get "/api/tracks/top", to: "tracks#top"
  get "/api/tracks/recent", to: "tracks#recent"
  post "/api/tracks", to: "tracks#create"

  get "/api/albums/saved", to: "albums#saved"
  post "/api/albums/savetrack", to: "albums#create"

end
