require 'json'

class Alchemy
	include HTTParty
	base_uri 'http://access.alchemyapi.com/calls'

	def initialize(apikey,text)
		@options = { query: {apikey: apikey, text: text, outputMode: 'json'} }
		@countdown = 5
	end

	def text_analysis
		# @countdown = @countdown == 0 ? 5 : @countdown - 1
		# result = self.class.post("/text/TextGetTextSentiment", @options)
		# text_analysis if result['status'] != 'OK' && @countdown > 0
		# result.body
	end
end