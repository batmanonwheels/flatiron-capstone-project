class Favorite < ApplicationRecord
  belongs_to :user
  belongs_to :track
  validates :track, uniqueness: {scope: :user}

end
