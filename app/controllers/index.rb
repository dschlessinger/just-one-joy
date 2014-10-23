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

get '/posts' do
  @today = current_user.posts.where(updated_at: Date.yesterday.to_time...Time.current).order(updated_at: :desc)
  @posts = current_user.posts.order(updated_at: :desc)
  erb :my_html, layout: false
end

post '/posts' do
  p "="*50
  p "Params:"
  p params
  p "We are running the following post: Post.create(#{params})"
  p "="*50
  post = Post.create(params)
  p "~"*50
  p "Sentiment:"
  p post.sentiment
  p "~"*50
  p "@"*50
  p "Post:"
  p post
  p "@"*50
  @today = current_user.posts.where(updated_at: Date.yesterday.to_time...Time.current).order(updated_at: :desc)
  @posts = current_user.posts.order(updated_at: :desc)
  erb :my_html, layout: false
end

post '/star_post' do
  post = Post.find(params[:id])
  post.starred == true ? post.starred = false : post.starred = true
  post.save
  content_type :json
  return {id: post.id, boolean: post.starred}.to_json
end