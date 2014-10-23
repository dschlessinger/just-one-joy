require 'faker'
require 'date'

User.create(first_name: "Daniel", last_name: "Schlessinger", email: "example@gmail.com", password: "password")

10.times {User.create(first_name: Faker::Name.first_name, last_name: Faker::Name.last_name, email: Faker::Internet.email, password: Faker::Lorem.characters(10))}

User.all.each do |user|
	array = (1..20).to_a.sample(5)
	count = 1
	# 20.times do
		array.include?(count) ? boolean = true : boolean = false
		Post.create(starred: boolean, body: Faker::Company.catch_phrase, user_id: user.id, updated_at: (Date.today - rand(10)))
	# 	count = count + 1
	# end
end