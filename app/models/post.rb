class Post < ActiveRecord::Base
  validates_presence_of :body
  belongs_to :user
  serialize :sentiment, JSON

  before_create do
  	self.sentiment = Alchemy.new(API_KEY, self.body).text_analysis
  end
end