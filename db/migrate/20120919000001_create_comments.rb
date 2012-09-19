class CreateComments < ActiveRecord::Migration
  def change
    create_table :comments do |t|
      t.text :content
      t.integer :snippet_id, :default => 0
      t.integer :linenum, :default => 0
      t.integer :user_id, :default => 0
      t.datetime :time, :default => Time.now.utc

      t.timestamps
    end
  end
end


