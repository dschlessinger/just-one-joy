require 'json'

class Alchemy
	include HTTParty
	base_uri 'http://access.alchemyapi.com/calls'

	def initialize(apikey,text)
		@options = { query: {apikey: apikey, text: text, outputMode: 'json'} }
		@countdown = 5
	end

	def text_analysis
		@countdown = @countdown == 0 ? 5 : @countdown - 1
		result = self.class.post("/text/TextGetTextSentiment", @options)
		p "*"*50
		p result
		p "*"*50

		if result['status'] != 'OK' && @countdown > 0
		  return text_analysis
		else
		  return result.body
	  end
	end

end