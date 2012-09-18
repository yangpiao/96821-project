class CreateSnippets < ActiveRecord::Migration
  def change
    create_table :snippets do |t|
      t.string :name
      t.string :desc
      t.integer :filetype, :default => 0
      t.string :content
      t.datetime :time, :default => Time.now.utc
      t.integer :user_id, :default => 0

      t.timestamps
    end
  end
end
