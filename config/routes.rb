Rails.application.routes.draw do

  scope '/api' do
    resources :tracks, :comments, :likes, :reviews, :favorites, :users
  end

end
