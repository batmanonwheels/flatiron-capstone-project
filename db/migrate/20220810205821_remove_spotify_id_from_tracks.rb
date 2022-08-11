class RemoveSpotifyIdFromTracks < ActiveRecord::Migration[6.1]
  def change
    remove_column :tracks, :spotify_id
  end
end
