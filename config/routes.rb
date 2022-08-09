Rails.application.routes.draw do
  resources :comments
  resources :likes
  resources :reviews
  resources :favorites
  resources :tracks
  resources :users
  get '/auth/spotify/callback', to: 'users#spotify'

  get "/hello", to: "application#hello_world"

  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
