myText = "I can't wait to integrate AlchemyAPI's awesome Ruby SDK into my app!"
response = alchemyapi.sentiment("text", myText)
puts "Sentiment: " + response["docSentiment"]["type"]

def sentiment(flavor, data, options = {})
	#Add the URL encoded data to the options and analyze
	# options[flavor] = data
	return analyze(@@ENDPOINTS['sentiment'][flavor], options)
end

def analyze(url, options)

	#Insert the base URL
	url = @@BASE_URL + url

	#Add the API key and set the output mode to JSON
	options['apikey'] = @apiKey
	options['outputMode'] = 'json'

	uri = URI.parse(url)
	request = Net::HTTP::Post.new(uri.request_uri)
	request.set_form_data(options)

	# disable gzip encoding which blows up in Zlib due to Ruby 2.0 bug
	# otherwise you'll get Zlib::BufError: buffer error
	request['Accept-Encoding'] = 'identity'

	#Fire off the HTTP request
	res = Net::HTTP.start(uri.host, uri.port) do |http|
    		http.request(request)
  	end

	#parse and return the response
	return JSON.parse(res.body)
end