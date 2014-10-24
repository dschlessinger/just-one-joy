require 'time'
require 'date'

get '/' do
	if logged_in?
		erb :index
	else
		erb :log_in
	end
end

post '/sessions' do
  user = User.find_by email: params[:email]
  if user && user.password == params[:password]
    session[:user_id] = user.id
  end
  redirect '/'
end

#----------- USERS -----------

get '/users/new' do
	erb :sign_up
end

post '/users/new' do
  new_user = User.new(params)
  if new_user.save
  	session[:user_id] = new_user.id
  end
  redirect '/'
end

delete '/sessions/:id' do
  session.clear
  redirect '/'
end

#----------- POSTS -----------

get '/graph/all' do
  average = current_user.average
  posts = Post.all.pluck(:sentiment)
  content_type :json
  {average: average, posts: posts}.to_json
end

get '/graph/post' do
  post = Post.find(params[:id])
  content_type :json
  {this_score: (post.sentiment).to_s[0..5], all_score: (current_user.average).to_s[0..5]}.to_json
end

get '/posts' do
  @today = current_user.posts.where(updated_at: Date.yesterday.to_time...Time.current).order(updated_at: :desc)
  @posts = current_user.posts.order(updated_at: :desc)
  erb :my_html, layout: false
end

post '/posts' do
  post = Post.create(params)
  @today = current_user.posts.where(updated_at: Date.yesterday.to_time...Time.current).order(updated_at: :desc)
  @posts = current_user.posts.order(updated_at: :desc)
  p "*"*100
  erb :my_html, layout: false
end

post '/star_post' do
  post = Post.find(params[:id])
  post.starred == true ? post.starred = false : post.starred = true
  post.save
  content_type :json
  return {id: post.id, boolean: post.starred}.to_json
end