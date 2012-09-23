require 'digest/md5'

class User < ActiveRecord::Base
  before_save :set_avatar

  # Include default devise modules. Others available are:
  # :token_authenticatable, :confirmable,
  # :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable,
         :validatable

  # Setup accessible (or protected) attributes for your model
  attr_accessible :name, :email, :password, :password_confirmation,
    :remember_me, :avatar
  # attr_accessor :avatar
  # attr_accessible :title, :body

  has_many :snippets
  validates :name, :presence => true
  # has_many :comments

protected
  def set_avatar
    self.avatar = Digest::MD5.hexdigest(self.email.downcase)
  end
end
