class CreateSnippets < ActiveRecord::Migration
  def change
    create_table :snippets do |t|
      t.string :name
      t.text :desc, :limit => 1000000000
      t.integer :filetype, :default => 0
      t.text :content, :limit => 1000000000
      t.datetime :time, :default => Time.now.utc
      t.integer :user_id, :default => 0

      t.timestamps
    end
  end
end

