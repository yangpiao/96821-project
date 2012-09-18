class Snippet < ActiveRecord::Base
  attr_accessible :content, :desc, :filetype, :name, :time, :user_id
  has_many :comments
end
