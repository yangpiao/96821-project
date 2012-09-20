class Snippet < ActiveRecord::Base
  attr_accessible :content, :desc, :filetype, :name, :time, :user_id
  has_many :comments
  validates :name, :presence => true, :length => { :maximum => 50 }
  validates :desc, :length => { :maximum => 10000 }
  validates :content, :presence => true, :length => { :maximum => 10000000 }
  validates :filetype, :numericality => { :only_integer => true }

end
