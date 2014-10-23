require 'httparty'

class Alchemy
	include HTTParty
	base_uri 'http://access.alchemyapi.com/calls'

	def initialize(apikey,text)
		@options = { query: {apikey: apikey, text: text, outputMode: 'json'} }
	end

	def text_analysis
		result = self.class.post("/text/TextGetTextSentiment", @options)
		JSON.parse(result.body)["docSentiment"]["score"].to_f
	end
end

class Post < ActiveRecord::Base
  validates_presence_of :body
  belongs_to :user

  before_create do
  	self.sentiment = Alchemy.new(ENV['APIKEY'], self.body).text_analysis
  end
end