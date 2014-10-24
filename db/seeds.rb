require 'faker'
require 'date'

daniel = User.create(first_name: "Daniel", last_name: "Schlessinger", email: "example@gmail.com", password: "password")

array = (1..10).to_a.sample(5)
count = 1
emotions = %w(sad happy joyful joyous depressed mad angry elated incredible terrible)

10.times do
	array.include?(count) ? boolean = true : boolean = false
	Post.create(starred: true, body: "I feel #{emotions.shift}", user_id: 1, updated_at: (Date.today - rand(3)))
	count = count + 1
end