require 'json'

class Post < ActiveRecord::Base
  validates_presence_of :body
  belongs_to :user

  before_save do
  	alchemyResult = Alchemy.new(API_KEY, self.body).text_analysis
  	final = JSON.parse(alchemyResult)['docSentiment']
    p "*"*100
    p final
    p "*"*100
  	if final.length == 2
  		self.sentiment = ((final['score'].to_f + 1)*50).ceil.to_i
  	end
  	user = User.find(self.user_id)
  	user.average = user.posts.pluck(:sentiment).inject(:+)/user.posts.length
  	user.save
  end
end