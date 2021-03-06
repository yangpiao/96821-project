class Snippet < ActiveRecord::Base
  attr_accessible :content, :desc, :filetype, :name, :time, :user_id, :commentable
  has_many :comments
  belongs_to :user
  validates :name, :presence => true, :length => { :maximum => 50 }
  validates :desc, :length => { :maximum => 10000 }
  validates :content, :presence => true, :length => { :maximum => 10000000 }
  validates :filetype, :numericality => { :only_integer => true }

end
