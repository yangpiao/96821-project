# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20120916004219) do

  create_table "comments", :force => true do |t|
    t.string   "content"
    t.integer  "snippet_id", :default => 0
    t.integer  "linenum",    :default => 0
    t.integer  "user_id",    :default => 0
    t.datetime "time",       :default => '2012-09-18 17:04:32'
    t.datetime "created_at",                                    :null => false
    t.datetime "updated_at",                                    :null => false
  end

  create_table "snippets", :force => true do |t|
    t.string   "name"
    t.string   "desc"
    t.integer  "filetype",   :default => 0
    t.string   "content"
    t.datetime "time",       :default => '2012-09-16 02:39:29'
    t.integer  "user_id",    :default => 0
    t.datetime "created_at",                                    :null => false
    t.datetime "updated_at",                                    :null => false
  end

end
