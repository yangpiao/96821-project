class AddCommentableToSnippets < ActiveRecord::Migration
  def change
    add_column :snippets, :commentable, :boolean, :default => true
  end
end
