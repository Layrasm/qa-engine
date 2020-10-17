# frozen_string_literal: true

class User < ActiveRecord::Base
  extend Devise::Models

  has_many :questions
  has_many :answers
  has_many :answers, through: :questions
  has_many :comments
  has_many :comments, through: :answers
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  include DeviseTokenAuth::Concerns::User
end
