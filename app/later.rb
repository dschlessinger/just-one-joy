require 'httparty'

class Alchemy
	include HTTParty
	base_uri 'http://access.alchemyapi.com/calls'

	def initialize(apikey,text)
		@options = { query: {apikey: apikey, text: text, outputMode: 'json'} }
	end

	def text_analysis
		result = self.class.post("/text/TextGetTextSentiment", @options)
		JSON.parse(result.body)
	end
end

client = Alchemy.new('b9c67370b8702641d0933b7feaac314aac7d80a1', 'I feel very sad')
p client.text_analysis["docSentiment"]["score"].to_f