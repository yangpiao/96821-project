class Comment < ActiveRecord::Base
  attr_accessible :content, :snippet_id, :linenum, :user_id, :time
  validates :content, :presence => true, :length => { :maximum => 5000 }
  belongs_to :user
end

