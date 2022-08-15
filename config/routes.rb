Rails.application.routes.draw do

  scope '/api' do
    resources :tracks, only: [:index, :show, :create, :destroy ]
    resources :comments, only: [:index, :show, :create, :update, :destroy ]
    resources :likes, only: [:index, :show, :create, :destroy ]
    resources :reviews, only: [:index, :show, :create, :update, :destroy ]
    resources :favorites, only: [:index, :show, :create, :destroy ]
    resources :users, only: [:index, :show, :create]
  end

  get '/api/v1/login/index', to: 'api/v1/login#index'

  get '/api/v1/login/callback', to: 'api/v1/login#create'



  namespace :api do
    namespace :v1 do
      resources :tracks do
        collection do
          get :top_100
          get :random
          get :search
        end
      end
    end
  end

end
