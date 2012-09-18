class Comment < ActiveRecord::Base
  attr_accessible :content, :snippet_id, :linenum, :user_id, :time
end

