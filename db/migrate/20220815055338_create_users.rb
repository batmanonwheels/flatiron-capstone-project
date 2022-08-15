class CreateUsers < ActiveRecord::Migration[6.1]
  def change
    create_table :users do |t|
      t.string :full_name
      t.string :username
      t.string :email
      t.string :profile_pic
      t.string :spotify_url
      t.string :country
      t.string :href
      t.string :uri
      t.integer :total_followers
      t.string :access_token
      t.string :refresh_token

      t.timestamps
    end
  end
end
