class SpotifyApiAdapter

  def self.get_user_top_tracks(user)
    # Update user's refresh token if necessary

    user.refresh_auth_token
    # Construct and send API call to get top tracks
    api_url = "https://api.spotify.com/v1/me/top/tracks/"
    header = {
      Authorization: "Bearer #{user.access_token}"
    }
    query_params = {
      limit: 12,
      time_range: "short_term"
    }
    url = "#{api_url}?#{query_params.to_query}"
    # Parse and return only track items from response
    top_response = Faraday.get("#{api_url}?#{query_params.to_query}", {}, {Authorization: "Bearer #{user.access_token}"})
    top_response_body = JSON.parse(top_response.body)

  end

  def self.get_user_recent_tracks(user)
    # Update user's refresh token if necessary
    user.refresh_auth_token

    # Construct and send API call to get user's 50 most recently played tracks
    api_url = "https://api.spotify.com/v1/me/player/recently-played/"
    header = {
      Authorization: "Bearer #{user.access_token}"
    }
    query_params = {
      limit: 48
    }
    # url = "#{api_url}?#{query_params.to_query}"
    # Parse and return only track items from response, grouped by date for d3
    recent_tracks_response = Faraday.get("#{api_url}?#{query_params.to_query}", {}, {Authorization: "Bearer #{user.access_token}"})

    recent_tracks_body = JSON.parse(recent_tracks_response.body)

    # recent_tracks = group_recent_tracks(recent_tracks_params["items"])
    # time_analysis = recent_track_time_analysis(response["items"])

    # {
    #   recent_tracks: recent_tracks,
    #   time_analysis: time_analysis
    # }
  end
  private

    def self.group_recent_tracks(tracks)
      # Create an array of hashes, each hash containing a key for a date and
      # and hour, an array of tracks played at that time, and the total track count;
      # Reverse array so that it is in ascending order by time
      previous_date_and_hour = nil
      tracks.each_with_object([]) do |track, arr|
        date_and_hour = track["played_at"].to_datetime.strftime("%Y-%m-%dT%H")
        if date_and_hour == previous_date_and_hour
          # add track to beginning of array, so they are in ascending order
          arr.last[:tracks].unshift(track)
          arr.last[:count] += 1
        else
          arr << {time: date_and_hour, tracks: [track], count: 1}
          previous_date_and_hour = date_and_hour
        end
      end.reverse
    end

end