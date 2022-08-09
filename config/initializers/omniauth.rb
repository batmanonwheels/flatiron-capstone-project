require 'rspotify/oauth'
require_relative '../../../.spotify_key.rb'

Rails.application.config.middleware.use OmniAuth::Builder do
  provider :spotify, `#{client_id}`, `#{client_secret}`, scope: 'user-read-email playlist-modify-public user-library-read user-library-modify'
end

OmniAuth.config.allowed_request_methods = [:post, :get]
