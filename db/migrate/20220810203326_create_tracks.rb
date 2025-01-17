class CreateTracks < ActiveRecord::Migration[6.1]
  def change
    create_table :tracks do |t|
      t.string :name
      t.string :artist
      t.string :album
      t.string :image
      t.string :preview
      t.string :spotify_id
      t.string :spotify_uri

      t.timestamps
    end
  end
end
